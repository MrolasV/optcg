import * as React from 'react';
import { useState, useEffect } from 'react';

import { CardSort, CardSortDirection, CardSortOrderBy } from 'modules/common/constants';
import { capitalizeFirst } from 'modules/common/util';

import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import Select, { SelectProps } from '@cloudscape-design/components/select';

interface CardSearchSortProps {
  onSortChange?: (cardSort: CardSort) => void;
}

const CardSearchSort = (props: CardSearchSortProps): JSX.Element => {
  const { onSortChange } = props;

  const [ orderBy, setOrderBy ] = useState<CardSortOrderBy>(CardSortOrderBy.DEFAULT);
  const [ direction, setDirection ] = useState<CardSortDirection>(CardSortDirection.DESC);

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
    <div className='sorting-select'>
      <Box padding={{top: 'xs'}} >Sort by</Box>
      <Select
        selectedOption={selectedOrderByOption}
        options={orderByOptions}
        onChange={({ detail }) => setOrderBy(Object(CardSortOrderBy)[detail.selectedOption.value || 'DEFAULT'])}
      />
      <Select
        selectedOption={selectedDirectionOption}
        options={directionOptions}
        onChange={({ detail }) => setDirection(Object(CardSortDirection)[detail.selectedOption.value || 'DESC'])}
      />
    </div>
  </Container>
}

export default CardSearchSort;