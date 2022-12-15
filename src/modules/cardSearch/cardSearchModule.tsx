import * as React from 'react';

import CardSearchFilter from './filter/cardSearchFilter';
import CardSearchList from './list/cardSearchList';
import CardSearchSort from './list/cardSearchSort';
import { CardPool } from './constants';

import './styles.scss';

interface CardSearchModuleProps {
  cardPool: CardPool;
  displayQuantity: boolean;
}

const CardSearchModule = (props: CardSearchModuleProps): JSX.Element => {
  const { cardPool, displayQuantity } = props;

  return <div className='card-search-module'>
    <div className='list-wrapper'>
      <CardSearchSort/>
      <CardSearchList/>
    </div>
    <CardSearchFilter
      cardPool={cardPool}
    />
  </div>
}

export default CardSearchModule;