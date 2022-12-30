import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import _ from 'lodash';

import { Page } from 'home/page';
import CardSearchModule from 'modules/cardSearch/cardSearchModule';
import BuilderManagerContainer from './builderManagerContainer';
import BuilderAnalysisWindow from './builderAnalysisWindow';
import BuilderContainer from './builderContainer';
import { useDatabase } from 'setdb/useDatabase';
import { Deck } from './constants';
import { getLocalStorageItem } from 'modules/common/util';
import { lsCollectionKey, lsWorkingCollectionKey, lsWorkingCollectionNameKey, lsWorkingDeckKey, lsWorkingDeckNameKey } from 'modules/common/constants';
import { Collection } from 'modules/collection/constants';
import { cardToCardId, dbCardToCollectionCard, localCollectionToCollection } from 'modules/collection/util';
import { deckToCollection, deckToLocalCollection, localCollectionToDeck } from './util';
import { CardType, CollectionCard, DbCard } from 'setdb/constants';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SegmentedControl, { SegmentedControlProps } from '@cloudscape-design/components/segmented-control';

import './styles.scss';

const BuilderView = (): JSX.Element => {
  const navigate = useNavigate();

  const { cardDatabase, getDbCard } = useDatabase();
  const cachedCardDatabase = useRef<{[setId: string]: DbCard[]}>(cardDatabase);
  const cardDatabaseAsList = Object.values(cardDatabase).reduce((acc, cardDatabaseSet) => {
    return [...acc, ...(cardDatabaseSet.filter(dbCard => !!dbCard))];
  }, []);

  const [ workingDeck, setWorkingDeck ] = useState<Deck>(() => {
    const ln: string = getLocalStorageItem<string>(lsWorkingDeckNameKey) || '';
    const ld: string = getLocalStorageItem<string>(lsWorkingDeckKey) || '';
    let parsedWorkingDeck: Deck = {
      name: ln,
      mainCards: [],
    }
    try {
      parsedWorkingDeck = localCollectionToDeck(ln, ld);
    } catch {}
    return parsedWorkingDeck;
  })
  const [ deckCollection, setDeckCollection ] = useState<Collection>({
    name: '_db',
    inventory: cardDatabaseAsList.map(dbCard => {
      return {
        card: dbCardToCollectionCard(dbCard),
        quantity: 1,
      }
    })
  })

  useEffect(() => {
    if (deckCollection.name === '_db' && !_.isEqual(cardDatabase, cachedCardDatabase.current)) {
      setDeckCollection({
        name: '_db',
        inventory: cardDatabaseAsList.map(dbCard => {
          return {
            card: dbCardToCollectionCard(dbCard),
            quantity: 1,
          }
        })
      })
    }
  }, [ cardDatabase ])

  useEffect(() => {
    localStorage.setItem(lsWorkingDeckNameKey, workingDeck.name);
    localStorage.setItem(lsWorkingDeckKey, deckToLocalCollection(workingDeck));
  }, [ workingDeck ])

  const onCardPoolChange = (cardPoolId: string) => {
    if (cardPoolId === '_db') {
      setDeckCollection({
        name: cardPoolId,
        inventory: cardDatabaseAsList.map(dbCard => {
          return {
            card: dbCardToCollectionCard(dbCard),
            quantity: 1,
          }
        })
      })
    } else if (cardPoolId === '_wc') {
      const localWorkingCollection: string = getLocalStorageItem<string>(lsWorkingCollectionKey) || '';
      const localWorkingCollectionName: string = getLocalStorageItem<string>(lsWorkingCollectionNameKey) || '';
      let parsedWorkingCollection: Collection = {
        name: localWorkingCollectionName,
        inventory: [],
      }
      try {
        parsedWorkingCollection = localCollectionToCollection(cardPoolId, localWorkingCollection);
      } catch {}
      setDeckCollection(parsedWorkingCollection);
    } else if (cardPoolId.startsWith('_c:')) {
      const collectionName = cardPoolId.substring(3);
      let parsedWorkingCollection: Collection = {
        name: cardPoolId,
        inventory: [],
      }
      const localCollection: string = getLocalStorageItem<string>(lsCollectionKey(collectionName)) || '';
      try {
        parsedWorkingCollection = localCollectionToCollection(cardPoolId, localCollection);
      } catch {}
      setDeckCollection(parsedWorkingCollection);
    }
  }

  const addCardToDeck = (collectionCard: CollectionCard) => {
    const dbCard = getDbCard(collectionCard, true);
    if (!dbCard) {
      return;
    }
    const updatedDeck: Deck = JSON.parse(JSON.stringify(workingDeck));
    if (dbCard.cardType === CardType.LEADER) {
      updatedDeck.leaderCard = collectionCard;
    } else {
      const deckSize: number = updatedDeck.mainCards.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      if (deckSize === 50) {
        return;
      }
      const updatedCards = workingDeck.mainCards.concat();
      const itemIndex = updatedCards.findIndex(item => cardToCardId(item.card) === cardToCardId(collectionCard));
      if (itemIndex === -1) {
        updatedCards.push({ card: collectionCard, quantity: 1 });
      } else {
        const copyMap: {[key: string]: number} = {};
        updatedCards.forEach(cardItem => {
          const cardId = cardToCardId(cardItem.card, true);
          const acc = !!copyMap[cardId] ? copyMap[cardId] : 0;
          copyMap[cardId] = acc + cardItem.quantity;
        });
        const updateCardId = cardToCardId(collectionCard, true);
        if (!!copyMap[updateCardId] && copyMap[updateCardId] < 4) {
          updatedCards[itemIndex].quantity++;
        }
      }
      updatedDeck.mainCards = updatedCards;
    }
    setWorkingDeck(updatedDeck);
  }

  const removeCardFromDeck = (collectionCard: CollectionCard) => {
    const cardId = cardToCardId(collectionCard);
    const updatedDeck: Deck = JSON.parse(JSON.stringify(workingDeck));
    if (workingDeck.leaderCard && cardId === cardToCardId(workingDeck.leaderCard)) {
      updatedDeck.leaderCard = undefined;
      setWorkingDeck(updatedDeck);
    } else {
      for (let i = 0; i < workingDeck.mainCards.length; i++) {
        const workingCardId = cardToCardId(workingDeck.mainCards[i].card);
        if (workingCardId === cardId) {
          if (workingDeck.mainCards[i].quantity === 1) {
            updatedDeck.mainCards.splice(i, 1);
          } else {
            updatedDeck.mainCards[i].quantity--;
          }
          setWorkingDeck(updatedDeck);
          return;
        }
      }
    }
  }

  const redirectToCollection = () => {
    navigate(`/${Page.collection}`)
  }

  const pageSegmentOptions: SegmentedControlProps.Option[] = [
    { id: Page.collection, text: 'Collection manager' },
    { id: Page.builder, text: 'Deck builder' }
  ]

  return <ContentLayout
    className='builder_content-layout'
    header={<Header
      variant='h1'
      className='builder_content-header'
      actions={<SegmentedControl
        selectedId={Page.builder}
        options={pageSegmentOptions}
        onChange={redirectToCollection}
      />}
    >
      Deck builder
    </Header>}
  >
    <div className='builder_content-wrapper card-search-filter_target'>
      <div className='builder_analysis-wrapper'>
        <BuilderAnalysisWindow
          workingDeck={workingDeck}
        />
      </div>
      <div className='builder_content'>
        <BuilderManagerContainer
          workingDeck={workingDeck}
          setWorkingDeckName={(name: string) => setWorkingDeck({ name, leaderCard: workingDeck.leaderCard, mainCards: workingDeck.mainCards })}
          onDeckLoad={(deck: Deck) => setWorkingDeck(deck)}
        />
        <BuilderContainer
          workingDeck={workingDeck}
          cardPool={deckCollection}
          addCardToDeck={addCardToDeck}
          removeCardFromDeck={removeCardFromDeck}
        />
      </div>
      <CardSearchModule
        cardPool={deckCollection}
        workingCardPool={deckToCollection(workingDeck)}
        onCardPoolChange={onCardPoolChange}
      />
    </div>
  </ContentLayout>
}

export default BuilderView;