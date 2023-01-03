import * as React from 'react';
import { useDrop } from 'react-dnd';

import { useDatabase } from 'setdb/useDatabase';
import { Deck, DeckIllegalReason, DeckWarningReason } from './constants';
import { CardType, CollectionCard } from 'setdb/constants';
import { Collection, CollectionInventory } from 'modules/collection/constants';
import { deckToCollection } from './util';
import { cardToCardId, sortCollectionInventory } from 'modules/collection/util';
import { CardSortDirection, CardSortOrderBy } from 'modules/common/constants';

import Container from '@cloudscape-design/components/container';
import Alert from '@cloudscape-design/components/alert';
import BuilderCard from './builderCard';

interface BuilderContainerProps {
  workingDeck: Deck;
  cardPool: Collection;
  addCardToDeck: (card: CollectionCard) => void;
  removeCardFromDeck: (card: CollectionCard) => void;
}

const BuilderContainer = (props: BuilderContainerProps): JSX.Element => {
  const { workingDeck, cardPool, addCardToDeck, removeCardFromDeck } = props;

  const { getDbCard } = useDatabase();
  
  const poolCopies: {[key: string]: number} = {};
  if (cardPool.name !== '_db') {
    cardPool.inventory.forEach(cardItem => {
      const cardId = cardToCardId(cardItem.card);
      poolCopies[cardId] = !!poolCopies[cardId] ? poolCopies[cardId] + cardItem.quantity : cardItem.quantity;
    });
  }
  const deckCopies: {[key: string]: number} = {};
  const deckInvariantCopies: {[key: string]: number} = {};
  workingDeck.mainCards.forEach(cardItem => {
    const cardId = cardToCardId(cardItem.card);
    const cardIdInvariant = cardToCardId(cardItem.card, true);
    deckCopies[cardId] = !!deckCopies[cardId] ? 
      deckCopies[cardId] + cardItem.quantity : 
      cardItem.quantity;
    deckInvariantCopies[cardIdInvariant] = !!deckInvariantCopies[cardIdInvariant] ? 
      deckInvariantCopies[cardIdInvariant] + cardItem.quantity : 
      cardItem.quantity;
  });
  const deckSize: number = workingDeck.mainCards.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const [ , dropRef ] = useDrop(() => {
    return {
      accept: ['card', 'builder_card'],
      drop: (item, monitor) => {
        // only handle card. builder_card and removals are done in the
        // drag 'end' handler. this drop area must accept the type though
        // so we can identify if the card was dragged out of the deck area
        if (monitor.getItemType() === 'card') {
          addCardToDeck(item as CollectionCard);
        }
      },
    }
  }, [ workingDeck, addCardToDeck ]);

  // TODO: Ban list?
  const checkDeckLegality = (): DeckIllegalReason | null => {
    if (!workingDeck.leaderCard) {
      return DeckIllegalReason.MISSING_LEADER;
    }
    if (deckSize < 50) {
      return DeckIllegalReason.MISSING_CARDS;
    }
    if (deckSize > 50) {
      return DeckIllegalReason.OVER_CARDS;
    }
    const deckOverCopies: boolean = Object.values(deckInvariantCopies).reduce((acc, curr) => {
      return acc || curr > 4;
    }, false);
    if (deckOverCopies) {
      return DeckIllegalReason.OVER_COPIES;
    }
    const leaderDbCard = getDbCard(workingDeck.leaderCard);
    if (!leaderDbCard) {
      return null;
    }
    for (const deckCard of workingDeck.mainCards) {
      const deckDbCard = getDbCard(deckCard.card);
      if (!deckDbCard) {
        continue;
      }
      for (const deckDbCardColor of deckDbCard.cardColors) {
        if (!leaderDbCard.cardColors.includes(deckDbCardColor)) {
          return DeckIllegalReason.COLOR_MISMATCH;
        }
      }
    }
    return null;
  }
  const deckIllegalReason: DeckIllegalReason | null = checkDeckLegality();

  const checkForDeckWarnings = (): DeckWarningReason | null => {
    if (cardPool.name === '_db') {
      return null;
    }
    for (const deckCopyEntry of Object.entries(deckCopies)) {
      const cardId = deckCopyEntry[0];
      const count = deckCopyEntry[1];
      if (!poolCopies[cardId]) {
        return DeckWarningReason.MISSING_COLLECTION;
      } else if (count > poolCopies[cardId]) {
        return DeckWarningReason.OVER_COLLECTION;
      }
    }
    return null;
  }
  const deckWarningReason: DeckWarningReason | null = checkForDeckWarnings();

  const leaderCard = !!workingDeck.leaderCard ? getDbCard(workingDeck.leaderCard, true) : undefined;
  const leaderCardId = !!workingDeck.leaderCard ? cardToCardId(workingDeck.leaderCard) : '';

  const renderMainDeck = (): JSX.Element => {
    const deckAsCollection: Collection = deckToCollection(workingDeck);
    const collectionInventory: CollectionInventory = deckAsCollection.inventory;
    sortCollectionInventory(collectionInventory, getDbCard, {
      orderBy: CardSortOrderBy.DEFAULT,
      direction: CardSortDirection.DESC
    });
    const cardList: CollectionCard[] = [];
    collectionInventory.forEach(item => {
      cardList.push(...Array(item.quantity).fill(item.card) as CollectionCard[]);
    });
    return <>
      {cardList.map((card, index) => {
        const dbCard = getDbCard(card, true);
        const cardId = cardToCardId(card);
        const cardIdInvariant = cardToCardId(card, true);
        if (dbCard && dbCard.cardType !== CardType.LEADER) {
          return <BuilderCard 
            card={dbCard} 
            leaderColors={leaderCard && leaderCard.cardColors}
            poolCount={cardPool.name === '_db' ? -1 : (!!poolCopies[cardId] ? poolCopies[cardId] : 0)}
            cardCount={!!deckCopies[cardId] ? deckCopies[cardId] : 0}
            cardInvariantCount={!!deckInvariantCopies[cardIdInvariant] ? deckInvariantCopies[cardIdInvariant] : 0}
            removeCardFromDeck={removeCardFromDeck} 
            key={index}
          />
        } else {
          return null;
        }
      })}
    </>
  }

  const columns = deckSize <= 50 ? 10 : 12;
  const rows = deckSize <= 50 ? 5 : 6;

  return <Container className='builder-container'>
    <div className='builder-grid-wrapper' ref={dropRef}>
      <Alert type={!!deckIllegalReason ? 'error' : (!!deckWarningReason ? 'warning' : 'success')}>
        {!!deckIllegalReason ? deckIllegalReason : (!!deckWarningReason ? deckWarningReason : 'Deck is legal')}
      </Alert>
      <div className='builder-deck-region'>
        <div className='builder-leader'>
          LEADER
          {leaderCard && <BuilderCard 
            card={leaderCard} 
            poolCount={cardPool.name === '_db' ? -1 : (!!poolCopies[leaderCardId] ? poolCopies[leaderCardId] : 0)}
            cardCount={1}
            cardInvariantCount={1}
            removeCardFromDeck={removeCardFromDeck} 
          />}
        </div>
        <div className='builder-main-deck_flex'>
          <div className='builder-main-deck_ratio'>
            <div className='builder-main-deck_text'>
              MAIN DECK
            </div>
            <div className='builder-main-deck'
              style={{
                gridTemplateColumns: `repeat(${columns}, calc((100% - ${((columns - 1) * 0.5).toFixed(1)}rem) / ${columns}))`,
                gridTemplateRows: `repeat(${rows}, calc((100% - ${((rows - 1) * 0.5).toFixed(1)}rem) / ${rows}))`,
              }}
            >
              {renderMainDeck()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
}

export default BuilderContainer;