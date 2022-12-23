import * as React from 'react';
import { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Collection, CollectionInventory, CollectionInventoryItem } from './constants';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import CardSummaryContainer from 'modules/common/cardSummaryContainer';
import { cardList } from 'setdb/cards/op01';
import { CollectionCard, DbCard } from 'setdb/constants';
import { filterCollectionInventory, sortCollectionInventory } from './util';
import { CardFilter, CardSort } from 'modules/common/constants';

import Container from '@cloudscape-design/components/container';
import { useDatabase } from 'setdb/useDatabase';

interface CollectionContainerProps {
  workingCollection: Collection;
  collectionFilter: CardFilter;
  collectionSort: CardSort;
  addCardToCollection: (card: CollectionCard) => void;
  removeCardFromCollection: (card: CollectionCard) => void;
}

const CollectionContainer = (props: CollectionContainerProps): JSX.Element => {
  const { getDbCard } = useDatabase();
  
  const { workingCollection, collectionFilter, collectionSort, addCardToCollection, removeCardFromCollection } = props;
  const filteredCollection: CollectionInventory = filterCollectionInventory(workingCollection.inventory, {}, getDbCard, collectionFilter);
  sortCollectionInventory(filteredCollection, getDbCard, collectionSort);

  const columnCount = useRef<number>(0);

  const [ , dropRef ] = useDrop(() => {
    return {
      accept: 'card',
      drop: item => {
        addCardToCollection(item as DbCard);
        return;
      },
    }
  }, [ workingCollection ])

  //@ts-ignore
  const renderGridItem = ({ columnIndex, rowIndex, style }) => {
    const index = columnCount.current * rowIndex + columnIndex;
    const item = filteredCollection[index];
    if (!item) {
      return <div/>
    }
    return <div style={{
      ...style,
      width: '30rem',
      padding: '1rem',
    }}>
      <CardSummaryContainer
        inventoryItem={item}
        draggable={false}
        showQuantityControls={true}
        onQuantityChange={delta => {
          if (delta > 0) {
            addCardToCollection(item.card);
          } else if (delta < 0) {
            removeCardFromCollection(item.card);
          }
        }}
      />
    </div>
  }

  return <Container className='collection-container'>
    <div className='grid-wrapper' ref={dropRef}>
      <AutoSizer>
        {({ height, width }) => {
          columnCount.current = Math.floor(width / 310);
          const rowCount = Math.ceil(filteredCollection.length / columnCount.current);
          return <Grid
            width={width + 20}
            columnCount={columnCount.current}
            columnWidth={310}
            height={height + 10}
            rowCount={rowCount}
            rowHeight={100}
          >
            {renderGridItem}
          </Grid>
        }}
      </AutoSizer>
    </div>
  </Container>
}

export default CollectionContainer;