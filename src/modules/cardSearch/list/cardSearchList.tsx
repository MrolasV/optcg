import * as React from 'react';
import { useState, useEffect } from 'react';

import { CardFilter, CardSort } from 'modules/common/constants';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { Collection, CollectionInventory } from 'modules/collection/constants';
import { DbCard } from 'setdb/constants';
import { cardToCardId, filterCollectionInventory, sortCollectionInventory } from 'modules/collection/util';
import CardSummaryContainer from '../../common/cardSummaryContainer';
import { useDatabase } from 'setdb/useDatabase';
import useForceUpdate from 'modules/common/useForceUpdate';

interface CardSearchListProps {
  cardPool: Collection; // list these
  workingCardPool: Collection; // for quantity counting
  cardSort: CardSort;
  cardFilter: CardFilter;
  quantityMode: 'subtract' | 'show';
}

const CardSearchList = (props: CardSearchListProps): JSX.Element => {
  const { cardDatabase, getDbCard } = useDatabase();
  
  const { cardPool, workingCardPool, cardSort, cardFilter, quantityMode } = props;

  const workingCardPoolQuantities: {[key: string]: number} = {};
  workingCardPool.inventory.forEach(cardData => {
    const cardId = cardToCardId(cardData.card);
    workingCardPoolQuantities[cardId] = cardData.quantity;
  });

   //#region List creation

  const cardListItems: CollectionInventory = cardPool.inventory.reduce((acc, cardData) => {
    const baseCardId = `${cardData.card.setId}-${cardData.card.setNumber}-`;
    const baseDbCard = getDbCard(cardData.card);
    const baseCard = baseDbCard ? {...baseDbCard} : undefined;
    if (!baseCard) {
      return acc;
    }
    if (baseCard.hasOwnProperty('artVariants')) {
      delete baseCard.artVariants;
    }
    if (baseCard.hasOwnProperty('artists')) {
      delete baseCard.artists;
    }

    let artist = baseDbCard!!.artists && baseDbCard!!.artists.length > 0 ? baseDbCard!!.artists[0] : 'Manga';
    let workingQuantity = workingCardPoolQuantities[baseCardId] || 0;
    let quantity = workingQuantity;
    if (quantityMode === 'subtract') { // deck view. will cardPool will be a user collection so no need to worry about art variants existing in pool
      quantity = cardData.quantity - workingQuantity;
    }
    const card: DbCard = {
      ...baseCard,
      artist
    }
    acc.push({ card, quantity });

    baseDbCard!!.artVariants?.forEach((artVariant, index) => {
      const cardId = `${baseCardId}${artVariant}`;
      artist = baseDbCard!!.artists && baseDbCard!!.artists.length > index + 1 ? baseDbCard!!.artists[index + 1] : 'Manga';
      workingQuantity = workingCardPoolQuantities[cardId] || 0;
      quantity = workingQuantity;
      if (quantityMode === 'subtract') {
        quantity = cardData.quantity - workingQuantity;
      }
      const cardVariant: DbCard = {
        ...baseCard,
        artVariant, artist
      }
      acc.push({ card: cardVariant, quantity });
    });
    return acc;
  }, [] as CollectionInventory);

  //#endregion

  //#region Filter and sort

  const filteredListItems: CollectionInventory = filterCollectionInventory(cardListItems, workingCardPoolQuantities, getDbCard, cardFilter);
  sortCollectionInventory(filteredListItems, getDbCard, cardSort);

  //#endregion

  //@ts-ignore
  const renderListItem = ({ index, style }) => (
    <div style={{
      ...style,
      paddingLeft: '8px',
      width: 'calc(100% - 16px)',
    }}>
      <CardSummaryContainer inventoryItem={filteredListItems[index]} draggable={true} showQuantityControls={false} />
    </div>
  )

  return <div className='scroller-wrapper' id='scroller-wrapper'>
    <AutoSizer disableWidth>
      {({ height, width }) =>
        <List
          height={height}
          itemCount={filteredListItems.length}
          itemSize={100}
          width={width}
        >
          {renderListItem}
        </List>
      }
    </AutoSizer>
  </div>
}

export default CardSearchList;