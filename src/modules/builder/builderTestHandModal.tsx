import * as React from 'react';
import { useState, useEffect } from 'react';

import { Deck } from './constants';
import { CollectionCard, DbCard, dbCardImgLink } from 'setdb/constants';
import { useDatabase } from 'setdb/useDatabase';
import CardTooltip from 'modules/common/cardTooltip';

import Container from '@cloudscape-design/components/container';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown, { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Header from '@cloudscape-design/components/header';

interface TestHandCardProps {
  card: CollectionCard | null;
  handIndex: number;
  getDbCard: (card: CollectionCard, useSpecifics?: boolean) => DbCard | undefined;
}

const TestHandCard = (props: TestHandCardProps): JSX.Element => {
  const { card, handIndex, getDbCard } = props;

  if (!card) {
    return <div/>;
  }
  
  const dbCard = getDbCard(card, true);
  if (!dbCard) {
    return <div/>
  }
  const anchorId = `test-hand-index-${handIndex}`;
  return <CardTooltip place='right' card={dbCard} noWrapper anchorId={anchorId} >
    <img src={dbCardImgLink(dbCard)} id={anchorId}/>
  </CardTooltip>
}

interface BuilderTestHandModalProps {
  workingDeck: Deck;
  visible: boolean;
  onDismiss: () => void;
}

const BuilderTestHandModal = (props: BuilderTestHandModalProps): JSX.Element => {
  const { workingDeck, visible, onDismiss } = props;
  const { getDbCard } = useDatabase();

  const [ shuffledDeck, setShuffledDeck ] = useState<CollectionCard[]>([]);

  useEffect(() => {
    if (visible) {
      shuffle();
    }
  }, [ visible, workingDeck ])

  const shuffle = () => {
    const expandedDeck: {card: CollectionCard, r: number}[] = [];
    workingDeck.mainCards.forEach(cardItem => {
      for (let i = 0; i < cardItem.quantity; i++) {
        expandedDeck.push({
          card: cardItem.card,
          r: Math.random(),
        })
      }
    });
    expandedDeck.sort((a, b) => a.r - b.r);
    setShuffledDeck(expandedDeck.map(item => item.card));
  }
  const handItems: JSX.Element[] = [];
  for (let i = 0; i < 6 && i < shuffledDeck.length; i++) {
    handItems.push(<TestHandCard card={shuffledDeck[i]} getDbCard={getDbCard} handIndex={i} />)
  }
  if (handItems.length === 6) {
    handItems.splice(5, 0, <div className='builder_test-hand-plus'><Icon name='add-plus' size='big' /></div>)
  }
  const spacerItems: JSX.Element[] = Array(6).fill(<div/>);
  spacerItems.push(<div className='builder_test-hand-extra-label'>FIRST DRAW</div>)

  return <Modal
    visible={visible}
    size='large'
    onDismiss={onDismiss}
    header={<Header
      variant='h2'
      actions={<Button
        variant='icon'
        iconName='refresh'
        onClick={shuffle}
      />}
    >
      Test hand
    </Header>}
  >
    <div className='builder_test-hand'>
      {spacerItems}
      {handItems}
    </div>
  </Modal>
}

export default BuilderTestHandModal;