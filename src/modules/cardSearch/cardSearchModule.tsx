import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import CardSearchFilter from './filter/cardSearchFilter';
import CardSearchList from './list/cardSearchList';
import CardSearchSort from './list/cardSearchSort';
import { CardFilter, CardSort, CardSortDirection, CardSortOrderBy } from 'modules/common/constants';
import { Collection } from 'modules/collection/constants';
import { Page } from 'home/page';

import './styles.scss';

interface CardSearchModuleProps {
  cardPool: Collection;
  workingCardPool: Collection;
  onFilterChange?: (cardFilter: CardFilter) => void;
}

const CardSearchModule = (props: CardSearchModuleProps): JSX.Element => {
  const { cardPool, workingCardPool, onFilterChange } = props;

  const location = useLocation();
  const view: Page = location.pathname.split('/')[1] || Page.collection;

  const [ cardFilter, setCardFilter ] = useState<CardFilter>({});
  const [ cardSort, setCardSort ] = useState<CardSort>({
    orderBy: CardSortOrderBy.DEFAULT,
    direction: CardSortDirection.DESC,
  });

  return <div className='card-search-module'>
    <div className='list-wrapper'>
      <CardSearchSort
        onSortChange={cardSort => setCardSort(cardSort)}
      />
      <CardSearchList
        cardPool={cardPool}
        workingCardPool={workingCardPool}
        cardSort={cardSort}
        cardFilter={cardFilter}
        quantityMode={view === Page.collection ? 'show' : 'subtract'}
      />
    </div>
    <CardSearchFilter
      expandToggleText='CARD LIST FILTER'
      onFilterChange={cardFilter => {
        setCardFilter(cardFilter);
        !!onFilterChange && onFilterChange(cardFilter);
      }}
      collectionContainsText={view === Page.collection ? 'In collection' : 'In deck'}
      showCollectionContainsSelect
    />
  </div>
}

export default CardSearchModule;