import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { IHomeState } from 'store';
import { toggleFilterExpanded } from 'store/cardSearchStore';

import Icon from '@cloudscape-design/components/icon';

const filterExpandedClassName = 'card-search-filter_expanded';

const ExpandToggle = (): JSX.Element => {
  const dispatch = useDispatch();

  const filterExpanded = useSelector((state: IHomeState) => state.cardSearch.filterExpanded);

  useEffect(() => {
    const slideTarget = document.querySelector('.card-search-filter_target');
    if (!slideTarget) return;
    if (filterExpanded && !slideTarget.classList.contains(filterExpandedClassName)) {
      slideTarget.classList.add(filterExpandedClassName);
    } else if (!filterExpanded && slideTarget.classList.contains(filterExpandedClassName)) {
      slideTarget.classList.remove(filterExpandedClassName);
    }
  }, [filterExpanded]);

  const onFilterExpandClick = () => {
    dispatch(toggleFilterExpanded({}));
  }

  return <div className='expand-toggle' onClick={onFilterExpandClick}>
      <Icon name={filterExpanded ? 'angle-up' : 'angle-down'} />
      <div className='expand-toggle-text'>
        CARD LIST FILTER
      </div>
    </div>
}

export default ExpandToggle;