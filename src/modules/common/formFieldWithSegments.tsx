import * as React from 'react';

import SegmentedControl from '@cloudscape-design/components/segmented-control';

import './styles.scss';

interface FormFieldWithSegmentsProps {
  label: string;
  segmentOptions: string[];
  currentSegmentOption: string;
  onSegmentOptionChange?: (segmentOption: string) => void;
  children?: React.ReactNode;
}

const FormFieldWithSegments = (props: FormFieldWithSegmentsProps): JSX.Element => {
  const {
    label,
    segmentOptions,
    currentSegmentOption,
    onSegmentOptionChange,
    children
  } = props;

  const segmentedControlOptions = segmentOptions.map(option => {
    return {
      id: option,
      text: option
    }
  })

  return <div className='form-field-with-segments'>
    <div className='form-field-with-segments_header'>
      <label>{label}</label>
      <SegmentedControl 
        selectedId={currentSegmentOption}
        options={segmentedControlOptions} 
        onChange={({ detail }) => {
          !!onSegmentOptionChange && onSegmentOptionChange(detail.selectedId);
        }}
      />
    </div>
    <div className='form-field-with-segments_children-wrapper'>
      {children}
    </div>
  </div>
}

export default FormFieldWithSegments;