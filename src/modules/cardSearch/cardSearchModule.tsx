import * as React from 'react';
import { useState } from 'react';

import CardSearchFilter from './filter/cardSearchFilter';
import CardSearchList from './list/cardSearchList';
import CardSearchSort from './list/cardSearchSort';
import { CardPool, CardFilter } from './constants';

import './styles.scss';

interface CardSearchModuleProps {
  cardPool: CardPool;
  displayQuantity: boolean;
  onFilterChange?: (cardFilter: CardFilter) => void;
}

const CardSearchModule = (props: CardSearchModuleProps): JSX.Element => {
  const { cardPool, displayQuantity, onFilterChange } = props;

  const [ cardFilter, setCardFilter ] = useState<CardFilter>();

  return <div className='card-search-module'>
    <div className='list-wrapper'>
      <CardSearchSort/>
      <CardSearchList/>
    </div>
    <CardSearchFilter
      onFilterChange={cardFilter => {
        setCardFilter(cardFilter);
        !!onFilterChange && onFilterChange(cardFilter);
      }}
    />
  </div>
}

export default CardSearchModule;