import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDatabase } from 'setdb/useDatabase';

import CollectionManagerContainer from './collectionManagerContainer';
import { Collection } from './constants';
import CardSearchFilter from 'modules/cardSearch/filter/cardSearchFilter';
import { CardFilter, CardSort, CardSortDirection, CardSortOrderBy, lsWorkingCollectionKey, lsWorkingCollectionNameKey } from 'modules/common/constants';
import CardSearchModule from 'modules/cardSearch/cardSearchModule';
import CollectionContainer from './collectionContainer';
import { getLocalStorageItem } from 'modules/common/util';
import { addCardToCollection, collectionToLocalCollection, localCollectionToCollection, removeCardFromCollection } from './util';
import { CollectionCard } from 'setdb/constants';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';

import './styles.scss';

const CollectionView = (): JSX.Element => {
  const { cardDatabase, cardDatabaseLoading } = useDatabase();
  const cardDatabaseAsList = Object.values(cardDatabase).reduce((acc, cardDatabaseSet) => {
    return [...acc, ...(cardDatabaseSet.filter(dbCard => !!dbCard))];
  }, []);

  const [ workingCollection, setWorkingCollection ] = useState<Collection>(() => {
    const localWorkingCollection: string = getLocalStorageItem<string>(lsWorkingCollectionKey) || '';
    const localWorkingCollectionName: string = getLocalStorageItem<string>(lsWorkingCollectionNameKey) || '';
    try {
      return localCollectionToCollection(localWorkingCollectionName, localWorkingCollection);
    } catch (e) {
      console.log('ccc');
      console.log(e);
      return {
        name: localWorkingCollectionName,
        inventory: []
      }
    }
  });
  const [ collectionFilter, setCollectionFilter ] = useState<CardFilter>({});
  const [ collectionSort, setCollectionSort ] = useState<CardSort>({ orderBy: CardSortOrderBy.SET, direction: CardSortDirection.ASC });

  useEffect(() => {
    localStorage.setItem(lsWorkingCollectionNameKey, workingCollection.name);
    localStorage.setItem(lsWorkingCollectionKey, collectionToLocalCollection(workingCollection));
  }, [ workingCollection ])

  const removeCardFromWorkingCollection = (collectionCard: CollectionCard) => {
    const collectionItemCount = workingCollection.inventory.length;
    const updatedCollection = removeCardFromCollection(collectionCard, {...workingCollection});
    if (updatedCollection.inventory.length < collectionItemCount) {
      const tooltip = document.querySelector('.optcg-tooltip');
      if (!!tooltip) {
        let showClass = '';
        tooltip.classList.forEach(className => {
          if (className.includes('module_show')) {
            showClass = className;
          }
        });
        if (!!showClass) {
          tooltip.classList.remove(showClass);
        }
      }
    }
    setWorkingCollection(updatedCollection)
  }

  const renderContent = (): JSX.Element => {
    return <div className='collection_content'>
      <CollectionManagerContainer
        workingCollection={workingCollection}
        collectionSort={collectionSort}
        setWorkingCollectionName={(name: string) => setWorkingCollection({ name: name, inventory: workingCollection.inventory })}
        onCollectionLoad={(collection: Collection) => setWorkingCollection(collection)}
        onSortChange={updatedSort => setCollectionSort(updatedSort)}
      />
      <CollectionContainer
        workingCollection={workingCollection}
        collectionFilter={collectionFilter}
        collectionSort={collectionSort}
        addCardToCollection={card => setWorkingCollection(addCardToCollection(card, {...workingCollection}))}
        removeCardFromCollection={removeCardFromWorkingCollection}
      />
    </div>
  }

  return <ContentLayout
    className='collection_content-layout'
    header={<Header variant='h1' className='collection_content-header'>
      Collection manager
    </Header>}
  >
    <div className='collection_content-wrapper card-search-filter_target'>
      <div className='collection_filter-wrapper'>
        <CardSearchFilter
          expandToggleText='COLLECTION FILTER'
          expandToggleSide='left'
          onFilterChange={cardFilter => setCollectionFilter(cardFilter)}
        />
      </div>
      {renderContent()}
      <CardSearchModule
        cardPool={{
          name: '_db',
          inventory: cardDatabaseAsList.map(dbCard => {
            return {
              card: dbCard,
              quantity: 1,
            }
          })
        }}
        workingCardPool={workingCollection}
      />
    </div>
  </ContentLayout>
}

export default CollectionView;