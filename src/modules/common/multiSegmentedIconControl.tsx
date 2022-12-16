import * as React from 'react';
import { useEffect, useRef } from 'react';

import { v4 as uuid} from 'uuid';

import SegmentedControl from '@cloudscape-design/components/segmented-control';
import { IconProps } from '@cloudscape-design/components/icon';

interface MultiSegmentedControlProps {
  selectedIds: string[];
  options: { iconName: IconProps.Name, id: string }[];
  onChange?: (selectedIds: string[]) => void;
}

const selectedClass = 'multi-segmented-control_selected';

const MultiSegmentedIconControl = (props: MultiSegmentedControlProps): JSX.Element => {
  const { selectedIds, options, onChange } = props;

  const componentId = useRef<string>(uuid());

  useEffect(() => {
    const controlWrapper = document.querySelector(`.multi-segmented-control-${componentId.current.substring(0, 8)}`);
    if (!controlWrapper) {
      return;
    }
    const buttons = controlWrapper.querySelectorAll('button');
    buttons.forEach((button, index) => {
      const isSelected = options.length > index && selectedIds.includes(options[index].id);
      if (isSelected && !button.classList.contains(selectedClass)) {
        button.classList.add(selectedClass);
      } else if (!isSelected && button.classList.contains(selectedClass)) {
        button.classList.remove(selectedClass);
      }
    });
  }, [ selectedIds, options ])

  return <SegmentedControl
    className={`multi-segmented-control-${componentId.current.substring(0, 8)}`}
    selectedId={''}
    options={options}
    onChange={({ detail }) => {
      !!onChange && onChange(options
        .map(option => option.id)
        .filter(id => 
          (selectedIds.includes(id) && detail.selectedId !== id) ||
          (!selectedIds.includes(id) && detail.selectedId === id)))
    }}
  />
}

export default MultiSegmentedIconControl;