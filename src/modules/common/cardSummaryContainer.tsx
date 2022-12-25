import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { CollectionInventoryItem } from 'modules/collection/constants';
import { ArtVariantCodes, CardColorHexCodes, CardType, CollectionCard, DbCard, DbCharacterCard, DbLeaderCard, SetId } from 'setdb/constants';
import CardTooltip from 'modules/common/cardTooltip';
import { useDatabase } from 'setdb/useDatabase';

import Container from '@cloudscape-design/components/container';
import SegmentedControl, { SegmentedControlProps } from '@cloudscape-design/components/segmented-control';

import './styles.scss';

interface CardSummaryContainerProps {
  card: CollectionCard;
  quantity: number;
  draggable: boolean;
  showQuantityControls: boolean;
  addCardToCollection?: (collectionCard: CollectionCard) => void;
  removeCardFromCollection?: (collectionCard: CollectionCard) => void;
}

const CardSummaryContainer = (props: CardSummaryContainerProps): JSX.Element => {
  const { getDbCard } = useDatabase();

  const { card, quantity, draggable, showQuantityControls, addCardToCollection, removeCardFromCollection } = props;

  const dbCard: DbCard | undefined = getDbCard(card, true);

  //@ts-ignore
  const [{ isDragging }, dragRef] = useDrag(() => {
    return {
      type: 'card',
      item: card,
      collect: monitor => ({
        isDragging: !!monitor.isDragging()
      })
    }
  }, [card])

  const getColorTagBG = () => {
    // https://blog.prototypr.io/css-only-multi-color-backgrounds-4d96a5569a20
    const c1: string = dbCard!!.cardColors.length ? `#${CardColorHexCodes[dbCard!!.cardColors[0]]}` : 'rgba(0,0,0,0)';
    const c2: string = dbCard!!.cardColors.length <= 1 ? c1 : `#${CardColorHexCodes[dbCard!!.cardColors[1]]}`;
    const typeTagBg: string = `linear-gradient(to right, ${c1} 50%, ${c2} 50%)`;
    return typeTagBg;
  }

  const setCode: string = Object.entries(SetId)[card.setId][1] as string;
  const variantString: string = card.hasOwnProperty('artVariant') ? ArtVariantCodes[card.artVariant || 0] : '';

  const getDetailLine1 = (): JSX.Element => {
    if (dbCard!!.cardType === CardType.LEADER) {
      const leaderCard = dbCard as DbLeaderCard;
      return <div className='card-summary_detail'>{`Life: ${leaderCard.life}`}</div>
    } else {
      const characterCard = dbCard as DbCharacterCard;
      return <div className='card-summary_detail'>{`Cost: ${characterCard.cost}`}</div>
    }
  }

  const getDetailLine2 = (): JSX.Element => {
    if (dbCard!!.cardType === CardType.LEADER || dbCard!!.cardType === CardType.CHARACTER) {
      const leaderCard = dbCard as DbLeaderCard;
      return <div className='card-summary_detail'>{`Power: ${leaderCard.power}`}</div>
    } else {
      return <></>;
    }
  }

  const quantityControlOptions: SegmentedControlProps.Option[] = [
    { id: '+', text: '+' }, { id: '-', text: '-' }
  ]

  return <CardTooltip card={dbCard} place='left'>
    <Container disableContentPaddings>
      <div 
        ref={draggable ? dragRef : null}
        className='card-summary'
        style={{
          cursor: draggable && !!dbCard ? 'grab' : 'auto'
        }}
      >
        {!!dbCard && <div className='card-summary_content'>
          <div>
            <div>
              <div className='card-summary_card-name'>{dbCard.cardName}</div>
              {getDetailLine1()}
              {getDetailLine2()}
            </div>
            <div className='card-summary_card-type-tag'
              style={{
                backgroundImage: getColorTagBG()
              }}
            >
              {Object.entries(CardType)[dbCard.cardType][1]}
            </div>
          </div>
          <div className='card-summary_bottom-row'>
            <div>
              <div>{`In collection: ${quantity}`}</div>
              {showQuantityControls && <SegmentedControl
                selectedId={''}
                options={quantityControlOptions}
                onChange={({ detail }) => {
                  if (detail.selectedId === '+' && addCardToCollection) {
                    addCardToCollection(card);
                  } else if (detail.selectedId === '-' && removeCardFromCollection) {
                    removeCardFromCollection(card);
                  }
                }}
              />}
            </div>
            <div>{`${setCode}-${dbCard.setNumber.toString().padStart(3, '0')} ${variantString}`}</div>
          </div>
        </div>}
      </div>
    </Container>
  </CardTooltip>
}

export default memo(CardSummaryContainer);