import * as React from 'react';
import { memo } from 'react';

import { CardFilter, CardSort } from 'modules/common/constants';
import AutoSizer from 'react-virtualized-auto-sizer';
import { areEqual, FixedSizeList as List } from 'react-window';
import { Collection, CollectionInventory } from 'modules/collection/constants';
import { CollectionCard } from 'setdb/constants';
import { cardToCardId, dbCardToCollectionCard, filterCollectionInventory, sortCollectionInventory } from 'modules/collection/util';
import CardSummaryContainer from '../../common/cardSummaryContainer';
import { useDatabase } from 'setdb/useDatabase';
import memoize from "memoize-one";
import { useLocation } from 'react-router';
import { Page } from 'home/page';

interface CardSearchListProps {
  cardPool: Collection; // list these
  workingCardPool: Collection; // for quantity counting
  cardSort: CardSort;
  cardFilter: CardFilter;
  quantityMode: 'poolCount' | 'workingCount';
}

const createMemoizedItems = memoize((filteredList, showQuantity) => ({
  filteredList, showQuantity,
}));

//@ts-ignore
const CardSearchListItem = memo(({ index, style, data }) => (
  <div style={{
    ...style,
    paddingLeft: '8px',
    width: 'calc(100% - 16px)',
  }}>
    <CardSummaryContainer
      card={data.filteredList[index].card}
      quantity={data.filteredList[index].quantity}
      draggable={true}
      showQuantityControls={false}
      showQuantity={data.showQuantity}
    />
  </div>
), areEqual)

const CardSearchList = (props: CardSearchListProps): JSX.Element => {
  const { getDbCard } = useDatabase();
  
  const { cardPool, workingCardPool, cardSort, cardFilter, quantityMode } = props;

  const location = useLocation();
  const view: Page = location.pathname.split('/')[1] || Page.collection;

  const workingCardPoolQuantities: {[key: string]: number} = {};
  workingCardPool.inventory.forEach(cardData => {
    const cardId = cardToCardId(cardData.card);
    workingCardPoolQuantities[cardId] = cardData.quantity;
  });

  //#region List creation

  const cardListItems: CollectionInventory = cardPool.inventory.reduce((acc, cardData) => {
    const baseCardId = `${cardData.card.setId}-${cardData.card.setNumber}-`;
    const baseDbCard = cardPool.name === '_db' ? getDbCard(cardData.card) : undefined;
    if (!baseDbCard && cardPool.name === '_db') {
      return acc;
    }
    const baseCard = cardPool.name === '_db' ? dbCardToCollectionCard(baseDbCard!!) : cardData.card;

    let workingQuantity = workingCardPoolQuantities[baseCardId] || 0;
    let quantity = workingQuantity;
    if (quantityMode === 'poolCount') { // deck view. will cardPool will be a user collection so no need to worry about art variants existing in pool
      quantity = cardData.quantity;
    }
    const card: CollectionCard = { ...baseCard }
    acc.push({ card, quantity });

    if (cardPool.name === '_db') {
      baseDbCard!!.artVariants?.forEach(artVariant => {
        const cardId = `${baseCardId}${artVariant}`;
        workingQuantity = workingCardPoolQuantities[cardId] || 0;
        quantity = workingQuantity;
        if (quantityMode === 'poolCount') {
          quantity = cardData.quantity;
        }
        const cardVariant: CollectionCard = {
          ...baseCard,
          artVariant
        }
        acc.push({ card: cardVariant, quantity });
      });
    }
    return acc;
  }, [] as CollectionInventory);

  //#endregion

  //#region Filter and sort

  const filteredListItems: CollectionInventory = filterCollectionInventory(cardListItems, workingCardPoolQuantities, getDbCard, cardFilter);
  sortCollectionInventory(filteredListItems, getDbCard, cardSort);

  //#endregion

  const showCardQuantity = view === Page.collection || (!!cardPool.name && cardPool.name !== '_db');
  const memoizedList = createMemoizedItems(filteredListItems, showCardQuantity);

  return <div className='scroller-wrapper' id='scroller-wrapper'>
    <AutoSizer disableWidth>
      {({ height, width }) =>
        <List
          height={height}
          itemCount={filteredListItems.length}
          itemSize={100}
          width={width}
          itemData={memoizedList}
        >
          {CardSearchListItem}
        </List>
      }
    </AutoSizer>
  </div>
}

export default CardSearchList;