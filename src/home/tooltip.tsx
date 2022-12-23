import * as React from 'react';
import { useRef } from 'react';

import { Tooltip as ReactTooltip } from 'react-tooltip';
import useMutationObserver from 'modules/common/useMutationObserver';

import './styles.scss';

const Tooltip = (): JSX.Element => {
  const mutationRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const onMutation = (mutations: MutationRecord[]) => {
    correctArrow();
  }
  useMutationObserver(mutationRef, onMutation);

  const arrowClassNameList = ['optcg-tooltip_arrow-top', 'optcg-tooltip_arrow-right', 'optcg-tooltip_arrow-bottom', 'optcg-tooltip_arrow-left'];

  const correctArrow = () => {
    const tooltipElement = document.querySelector('.optcg-tooltip');
    if (!tooltipElement) return;
    const arrowElement = tooltipElement.querySelector('.optcg-tooltip_arrow') as HTMLDivElement;
    if (!arrowElement) return;

    const _top = arrowElement.style.top;
    const _right = arrowElement.style.right;
    const _bottom = arrowElement.style.bottom;
    const _left = arrowElement.style.left;

    let arrowClassName = 'optcg-tooltip_arrow-top';
    if (_left && _top) {
      if (_top.startsWith('-')) {
        arrowClassName = 'optcg-tooltip_arrow-bottom';
      } else {
        arrowClassName = 'optcg-tooltip_arrow-right';
      }
    } else if (_right && _top) {
      arrowClassName = 'optcg-tooltip_arrow-left';
    }

    arrowClassNameList.forEach(cl => {
      if (arrowElement.classList.contains(cl) && cl !== arrowClassName) {
        arrowElement.classList.remove(cl);
      } else if (!arrowElement.classList.contains(cl) && cl === arrowClassName) {
        arrowElement.classList.add(cl);
      }
    })
  }

  return <div ref={mutationRef}>
    <ReactTooltip className='optcg-tooltip' classNameArrow='optcg-tooltip_arrow'/>
  </div>
}

export default Tooltip;