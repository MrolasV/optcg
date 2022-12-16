import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { IHomeState } from 'store';
import { toggleFilterExpanded } from 'store/cardSearchStore';

import Icon, { IconProps } from '@cloudscape-design/components/icon';

interface ExpandToggleProps {
  text: string;
  side: 'left' | 'right';
}

const filterExpandedClassName = 'card-search-filter_expanded';

const ExpandToggle = (props: ExpandToggleProps): JSX.Element => {
  const { text, side } = props;

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

  const renderIcon = (): JSX.Element => {
    const expandIcon: IconProps.Name = side === 'right' ? 'angle-down' : 'angle-up';
    const collapseIcon: IconProps.Name = side === 'right' ? 'angle-up' : 'angle-down';
    return <Icon name={filterExpanded ? collapseIcon : expandIcon} />
  }

  return <div 
    className='expand-toggle' 
    onClick={onFilterExpandClick}
    style={side === 'right' ? {
      left: '0.4rem',
      transform: 'rotate(90deg)',
      transformOrigin: '0 100%',
    } : {
      right: '0.4rem',
      transform: 'rotate(270deg)',
      transformOrigin: '100% 100%',
    }}
  >
      {side === 'right' && renderIcon()}
      <div className='expand-toggle-text'>
        {text}
      </div>
      {side === 'left' && renderIcon()}
    </div>
}

export default ExpandToggle;