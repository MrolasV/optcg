import * as React from 'react';
import { useRef, memo } from 'react';
import { useDrop } from 'react-dnd';

import { Collection, CollectionInventory, CollectionInventoryItem } from './constants';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import CardSummaryContainer from 'modules/common/cardSummaryContainer';
import { CollectionCard, DbCard } from 'setdb/constants';
import { filterCollectionInventory, sortCollectionInventory } from './util';
import { CardFilter, CardSort } from 'modules/common/constants';
import memoize from "memoize-one";

import Container from '@cloudscape-design/components/container';
import { useDatabase } from 'setdb/useDatabase';
import { debugTiming } from 'modules/common/util';

interface CollectionContainerProps {
  workingCollection: Collection;
  collectionFilter: CardFilter;
  collectionSort: CardSort;
  addCardToCollection: (card: CollectionCard) => void;
  removeCardFromCollection: (card: CollectionCard) => void;
}

const createMemoizedItems = memoize((columnCount, filteredCollection, addCardToCollection, removeCardFromCollection) => ({
  columnCount, filteredCollection, addCardToCollection, removeCardFromCollection
}));

//@ts-ignore
const CollectionContainerGridItem = memo(({ columnIndex, rowIndex, style, data }) => {
  const index = data.columnCount * rowIndex + columnIndex;
  const item = data.filteredCollection[index] as CollectionInventoryItem;
  if (!item) {
    return <div/>
  }
  return <div style={{
    ...style,
    width: '30rem',
    padding: '1rem',
  }}>
    <CardSummaryContainer
      card={item.card}
      quantity={item.quantity}
      draggable={false}
      showQuantityControls={true}
      addCardToCollection={data.addCardToCollection}
      removeCardFromCollection={data.removeCardFromCollection}
    />
  </div>
}, areEqual);

const CollectionContainer = (props: CollectionContainerProps): JSX.Element => {
  const { getDbCard } = useDatabase();
  
  const { workingCollection, collectionFilter, collectionSort, addCardToCollection, removeCardFromCollection } = props;
  const p1 = performance.now();
  const filteredCollection: CollectionInventory = filterCollectionInventory(workingCollection.inventory, {}, getDbCard, collectionFilter);
  const p2 = performance.now();
  sortCollectionInventory(filteredCollection, getDbCard, collectionSort);
  const p3 = performance.now();
  debugTiming('Collection list timing', [p1, p2, p3]);

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
  
  const memoizedCollection = createMemoizedItems(columnCount.current, filteredCollection, addCardToCollection, removeCardFromCollection);

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
            itemData={memoizedCollection}
          >
            {CollectionContainerGridItem}
          </Grid>
        }}
      </AutoSizer>
    </div>
  </Container>
}

export default CollectionContainer;