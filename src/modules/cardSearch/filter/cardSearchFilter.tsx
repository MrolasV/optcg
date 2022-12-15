import * as React from 'react';

import { CardPool } from '../constants';
import ExpandToggle from './expandToggle';

import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

interface CardSearchFilterProps {
  cardPool: CardPool;
}


const CardSearchFilter = (props: CardSearchFilterProps): JSX.Element => {

  const renderForm = (): JSX.Element => {
    return <SpaceBetween size='m'>
      <FormField label='Name'>
        <Input value='' />
      </FormField>
      {/* Generic */}
      {/* Name: input */}
      {/* Card type: select */}
      {/* Card colors: multiselect + and/or segments */}
      {/* Types: multiselect + and/or segments */}

      {/* Vanities - expandable */}
      {/* Card rarity: select */}
      {/* Art variant: select */}
      
      {/* Leader */}
      {/* Power: input + =/>=/<= segments */}
      {/* Attibute: select */}
      {/* Effect text: input */}
      {/* Life: input + =/>=/<= segments */}

      {/* Character */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Power: input + =/>=/<= segments */}
      {/* Attibute: select */}
      {/* Counter: input + =/>=/<= segments */}
      {/* Effect text: input */}
      {/* Trigger toggle: checkbox */}
      {/* Trigger text: input */}

      {/* Event */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Effect text: input */}
      {/* Trigger toggle: checkbox */}
      {/* Trigger text: input */}
      
      {/* Stage */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Effect text: input */}
    </SpaceBetween>
  }

  return <Container disableContentPaddings>
    <div className='filter-content-wrapper'>
      <ExpandToggle/>
    </div>
    <div className='filter-form-wrapper'>
      {renderForm()}
    </div>
  </Container>
}

export default CardSearchFilter;