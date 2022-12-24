import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { IWithDatabaseHOCProps, useDatabase, withDatabaseHOC } from 'setdb/useDatabase';
import _ from 'lodash';

import CollectionManagerContainer from './collectionManagerContainer';
import { Collection } from './constants';
import CardSearchFilter from 'modules/cardSearch/filter/cardSearchFilter';
import { CardFilter, CardSort, CardSortDirection, CardSortOrderBy, lsWorkingCollectionKey, lsWorkingCollectionNameKey } from 'modules/common/constants';
import CardSearchModule from 'modules/cardSearch/cardSearchModule';
import CollectionContainer from './collectionContainer';
import { debugTiming, getLocalStorageItem } from 'modules/common/util';
import { addCardToCollection, collectionToLocalCollection, localCollectionToCollection, removeCardFromCollection } from './util';
import { CollectionCard, DbCard } from 'setdb/constants';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';

import './styles.scss';

interface ICollectionViewProps extends IWithDatabaseHOCProps {}

interface ICollectionViewState {
  workingCollection: Collection;
  collectionFilter: CardFilter;
  collectionSort: CardSort;
}

class CollectionView extends React.Component<ICollectionViewProps, ICollectionViewState> {
  cardDatabaseAsList: DbCard[] = [];

  constructor (props: ICollectionViewProps) {
    super(props);

    const localWorkingCollection: string = getLocalStorageItem<string>(lsWorkingCollectionKey) || '';
    const localWorkingCollectionName: string = getLocalStorageItem<string>(lsWorkingCollectionNameKey) || '';
    let parsedWorkingCollection: Collection = {
      name: localWorkingCollectionName,
      inventory: [],
    }
    try {
      parsedWorkingCollection = localCollectionToCollection(localWorkingCollectionName, localWorkingCollection);
    } catch {}

    this.state = {
      workingCollection: parsedWorkingCollection,
      collectionFilter: {},
      collectionSort: {
        orderBy: CardSortOrderBy.SET,
        direction: CardSortDirection.ASC,
      }
    }

    this.cardDatabaseAsList = Object.values(this.props.cardDatabase).reduce((acc, cardDatabaseSet) => {
      return [...acc, ...(cardDatabaseSet.filter(dbCard => !!dbCard))];
    }, []);
  }

  componentDidUpdate (prevProps: ICollectionViewProps, prevState: ICollectionViewState) {
    if (!_.isEqual(this.props.cardDatabase, prevProps.cardDatabase)) {
      this.cardDatabaseAsList = Object.values(this.props.cardDatabase).reduce((acc, cardDatabaseSet) => {
        return [...acc, ...(cardDatabaseSet.filter(dbCard => !!dbCard))];
      }, []);
    }

    if (!_.isEqual(this.state.workingCollection, prevState.workingCollection)) {
      const p1 = performance.now();
      localStorage.setItem(lsWorkingCollectionNameKey, this.state.workingCollection.name);
      localStorage.setItem(lsWorkingCollectionKey, collectionToLocalCollection(this.state.workingCollection));
      const p2 = performance.now();
      debugTiming('Caching working collection', [p1, p2]);
    }
  }

  addCardToWorkingCollection = (collectionCard: CollectionCard) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        workingCollection: addCardToCollection(collectionCard, prevState.workingCollection)
      }
    });
  };

  removeCardFromWorkingCollection = (collectionCard: CollectionCard) => {
    this.setState((prevState) => {
      const collectionItemCount = this.state.workingCollection.inventory.length;
      const updatedCollection = removeCardFromCollection(collectionCard, prevState.workingCollection);
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
      return {
        ...this.state,
        workingCollection: updatedCollection
      }
    })
  };

  renderContent = (): JSX.Element => {
    return <div className='collection_content'>
      <CollectionManagerContainer
        workingCollection={this.state.workingCollection}
        collectionSort={this.state.collectionSort}
        setWorkingCollectionName={(name: string) => this.setState(prevState => {
          return {
            ...this.state,
            workingCollection: {
              name: name,
              inventory: prevState.workingCollection.inventory
            }
          }
        })}
        onCollectionLoad={(collection: Collection) => this.setState({ ...this.state, workingCollection: collection })}
        onSortChange={updatedSort => this.setState({ ...this.state, collectionSort: updatedSort })}
      />
      <CollectionContainer
        workingCollection={this.state.workingCollection}
        collectionFilter={this.state.collectionFilter}
        collectionSort={this.state.collectionSort}
        addCardToCollection={this.addCardToWorkingCollection}
        removeCardFromCollection={this.removeCardFromWorkingCollection}
      />
    </div>
  }

  render () {
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
            onFilterChange={cardFilter => this.setState({ ...this.state, collectionFilter: cardFilter })}
          />
        </div>
        {this.renderContent()}
        <CardSearchModule
          cardPool={{
            name: '_db',
            inventory: this.cardDatabaseAsList.map(dbCard => {
              return {
                card: dbCard,
                quantity: 1,
              }
            })
          }}
          workingCardPool={this.state.workingCollection}
        />
      </div>
    </ContentLayout>
  }
}

export default withDatabaseHOC(CollectionView);