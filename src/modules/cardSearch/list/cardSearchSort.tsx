import * as React from 'react';
import { useState, useEffect } from 'react';

import { CardSort, CardSortDirection, CardSortOrderBy, lsCollectionListKey } from 'modules/common/constants';
import { capitalizeFirst, getLocalStorageItem } from 'modules/common/util';

import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import { Collection } from 'modules/collection/constants';

interface CardSearchSortProps {
  cardSort: CardSort;
  cardPool: Collection;
  useWorkingCardPool: boolean;
  onSortChange: (cardSort: CardSort) => void;
  onCardPoolChange?: (cardPoolId: string) => void;
}

const CardSearchSort = (props: CardSearchSortProps): JSX.Element => {
  const { cardPool, useWorkingCardPool, onSortChange, onCardPoolChange } = props;
  const { orderBy, direction } = props.cardSort;

  const onOrderByChange = (e: CardSortOrderBy) => {
    onSortChange({
      orderBy: e,
      direction
    })
  }

  const onDirectionChange = (e: CardSortDirection) => {
    onSortChange({
      orderBy,
      direction: e
    })
  }

  const getLocalCollectionItems = (): SelectProps.Option[] => {
    const lsCollectionList: string[] = getLocalStorageItem<string[]>(lsCollectionListKey) || [];
    const options: SelectProps.Option[] = lsCollectionList.map(cn => {
      return {
        value: `_c:${cn}`,
        label: cn
      }
    });
    options.unshift({
      value: '_db',
      label: 'Database'
    },{
      value: '_wc',
      label: 'Working collection'
    });
    return options;
  }
  const localCollectionItems: SelectProps.Option[] = getLocalCollectionItems();
  const selectedCardPoolOption: SelectProps.Option =
    localCollectionItems.find(option => option.value === cardPool.name) || {};

  useEffect(() => {
    !!onSortChange && onSortChange({ orderBy, direction })
  }, [ orderBy, direction ])

  const orderByOptions: SelectProps.Option[] = Object.keys(CardSortOrderBy).filter(v => isNaN(Number(v))).map(orderBy => {
    return {
      label: capitalizeFirst(orderBy),
      value: orderBy,
    }
  });
  const selectedOrderByOption: SelectProps.Option = 
    orderByOptions.find(option => Object(CardSortOrderBy)[option.value || 'DEFAULT'] as CardSortOrderBy === orderBy) || {};

  const directionOptions: SelectProps.Option[] = Object.keys(CardSortDirection).filter(v => isNaN(Number(v))).map(order => {
    return {
      label: order,
      value: order,
    }
  });
  const selectedDirectionOption: SelectProps.Option = 
    directionOptions.find(option => Object(CardSortDirection)[option.value || 'DESC'] as CardSortDirection === direction) || {};

  return <Container>
    <div className='sorting-wrapper'>
      {!!onCardPoolChange && <div className='sorting-card-pool'>
        <Box padding={{top: 'xs'}} >Card Pool</Box>
        <Select
          selectedOption={selectedCardPoolOption}
          options={localCollectionItems}
          onChange={({ detail }) => onCardPoolChange(detail.selectedOption.value || '_db')}
        />
      </div>}
      <div className='sorting-select'>
        <Box padding={{top: 'xs'}} >Sort by</Box>
        <Select
          selectedOption={selectedOrderByOption}
          options={orderByOptions}
          onChange={({ detail }) => onOrderByChange(Object(CardSortOrderBy)[detail.selectedOption.value || 'DEFAULT'])}
        />
        <Select
          selectedOption={selectedDirectionOption}
          options={directionOptions}
          onChange={({ detail }) => onDirectionChange(Object(CardSortDirection)[detail.selectedOption.value || 'DESC'])}
        />
      </div>
    </div>
  </Container>
}

export default CardSearchSort;