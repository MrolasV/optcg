import * as React from 'react';
import { useState, useEffect } from 'react';

import { CardFilter } from '../constants';
import ExpandToggle from './expandToggle';
import FormFieldWithSegments from 'modules/common/formFieldWithSegments';
import { ArtistList, ArtVariant, CardAttribute, CardColor, CardRarity, CardType, SetId, SetNames, TypesList } from 'setdb/constants';

import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Checkbox from '@cloudscape-design/components/checkbox';
import Multiselect, { MultiselectProps } from '@cloudscape-design/components/multiselect';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Box from '@cloudscape-design/components/box';

interface CardSearchFilterProps {
  onFilterChange?: (cardFilter: CardFilter) => void;
}

const CardSearchFilter = (props: CardSearchFilterProps): JSX.Element => {
  const { onFilterChange } = props;

  const [ cardName, setCardName ] = useState<string>('');
  const [ cardSet, setCardSet ] = useState<string>('All');
  const [ cardType, setCardType ] = useState<string>('All');
  const [ cardColors, setCardColors ] = useState<CardColor[]>([]);
  const [ cardColorsUnionOption, setCardColorsUnionOption ] = useState<string>('and');
  const [ typeTags, setTypeTags ] = useState<string[]>([]);
  const [ typeTagsUnionOption, setTypeTagsUnionOption ] = useState<string>('and');

  const [ life, setLife ] = useState<string>('');
  const [ lifeCompareMode, setLifeCompareMode ] = useState<string>('=');
  const [ power, setPower ] = useState<string>('');
  const [ powerCompareMode, setPowerCompareMode ] = useState<string>('=');
  const [ cost, setCost ] = useState<string>('');
  const [ costCompareMode, setCostCompareMode ] = useState<string>('=');
  const [ counter, setCounter ] = useState<string>('');
  const [ counterCompareMode, setCounterCompareMode ] = useState<string>('=');
  const [ attribute, setAttribute ] = useState<string>('All');
  const [ effectText, setEffectText ] = useState<string>('');
  const [ hasTrigger, setHasTrigger ] = useState<boolean>(false);
  const [ triggerText, setTriggerText ] = useState<string>('');

  const [ rarity, setRarity ] = useState<string>('All');
  const [ artVariant, setArtVariant ] = useState<string>('All');
  const [ artist, setArtist ] = useState<string>('All');

  useEffect(() => {
    if (!onFilterChange) return;

    const cardFilter: CardFilter = {};
    if (!!cardName) {
      cardFilter.cardName = cardName;
    }
    if (cardSet !== 'All') {
      cardFilter.cardSet = Object(SetId)[cardSet] as SetId;
    }
    if (cardType !== 'All') {
      cardFilter.cardType = Object(CardType)[cardType] as CardType;
    }
    cardFilter.cardColors = cardColors;
    cardFilter.cardColorsUnionOption = cardColorsUnionOption;
    cardFilter.typeTags = typeTags;
    cardFilter.typeTagsUnionOption = typeTagsUnionOption;

    if (!!life) {
      cardFilter.life = Number(life);
      cardFilter.lifeCompareMode = lifeCompareMode;
    }
    if (!!power) {
      cardFilter.power = Number(power);
      cardFilter.powerCompareMode = powerCompareMode;
    }
    if (!!cost) {
      cardFilter.cost = Number(cost);
      cardFilter.costCompareMode = costCompareMode;
    }
    if (!!counter) {
      cardFilter.counter = Number(counter);
      cardFilter.counterCompareMode = counterCompareMode;
    }
    if (attribute !== 'All') {
      cardFilter.attribute = Object(CardAttribute)[attribute] as CardAttribute;
    }
    if (!!effectText) {
      cardFilter.effectTextTokens = effectText.split(' ');
    }
    if (hasTrigger) {
      cardFilter.hasTrigger = true;
      if (!!triggerText) {
        cardFilter.triggerTextTokens = triggerText.split(' ');
      }
    }
    if (rarity !== 'All') {
      cardFilter.rarity = Object(CardRarity)[rarity] as CardRarity;
    }
    if (artVariant !== 'All') {
      cardFilter.artVariant = Object(ArtVariant)[artVariant] as ArtVariant;
    }
    if (artist !== 'All') {
      cardFilter.artist = artist;
    }

    onFilterChange(cardFilter);
  }, [
    cardName, cardSet, cardType, cardColors, cardColorsUnionOption, typeTags, typeTagsUnionOption,
    life, lifeCompareMode, power, powerCompareMode, cost, costCompareMode, counter, counterCompareMode,
    attribute, effectText, hasTrigger, triggerText, rarity, artVariant, artist
  ]);

  const resetNonGenericFields = () => {
    setLife('');
    setLifeCompareMode('=');
    setPower('');
    setPowerCompareMode('=');
    setCost('');
    setCostCompareMode('=');
    setCounter('');
    setCounterCompareMode('=');
    setAttribute('All');
    setEffectText('');
    setHasTrigger(false);
    setTriggerText('');
  }

  // ===== COMMON FIELDS =====

  const renderPowerField = (): JSX.Element => {
    return <FormFieldWithSegments label='Power'
      segmentOptions={['=', '>=', '<=']}
      currentSegmentOption={powerCompareMode}
      onSegmentOptionChange={(segmentOption: string) => setPowerCompareMode(segmentOption)}
    >
      <Input 
        value={power}
        type='number'
        onChange={({ detail }) => setPower(detail.value)}
      />
    </FormFieldWithSegments>
  }

  const renderAttributeField = (): JSX.Element => {
    const attributeOptions: SelectProps.Option[] = Object.keys(CardAttribute).filter(v => isNaN(Number(v))).map(cardAttribute => {
      return {
        label: `${cardAttribute[0].toUpperCase()}${cardAttribute.slice(1).toLowerCase()}`,
        value: cardAttribute,
      }
    });
    attributeOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedAttributeOption: SelectProps.Option = attributeOptions.find(option => option.value === attribute) || {};

    return <FormField label='Attribute' >
      <Select
        selectedOption={selectedAttributeOption}
        options={attributeOptions}
        onChange={({ detail }) => setCardSet(detail.selectedOption.value || 'All')}
      />
    </FormField>
  }

  const renderEffectTextField = (): JSX.Element => {
    return <FormField label='Effect' >
      <Input
        value={effectText}
        onChange={({ detail }) => setEffectText(detail.value)}
      />
    </FormField>
  }

  const renderCostField = (): JSX.Element => {
    return <FormFieldWithSegments label='Cost'
      segmentOptions={['=', '>=', '<=']}
      currentSegmentOption={costCompareMode}
      onSegmentOptionChange={(segmentOption: string) => setCostCompareMode(segmentOption)}
    >
      <Input 
        value={cost}
        type='number'
        onChange={({ detail }) => setCost(detail.value)}
      />
    </FormFieldWithSegments>
  }

  const renderTriggerField = (): JSX.Element => {
    return <>
      <Checkbox
        checked={hasTrigger}
        onChange={({ detail }) => setHasTrigger(detail.checked)}
      >
        Has trigger
      </Checkbox>
      {hasTrigger && <FormField label='Trigger' >
        <Input
          value={triggerText}
          onChange={({ detail }) => setTriggerText(detail.value)}
        />
      </FormField>}
    </>
  }

  // ===== FIELD SECTIONS =====

  const renderGenericFields = (): JSX.Element => {
    const setOptions: SelectProps.Option[] = Object.entries(SetNames).map(setNameEntry => {
      return {
        label: `${setNameEntry[0]}: ${setNameEntry[1]}`,
        value: setNameEntry[0],
      }
    });
    setOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedSetOption: SelectProps.Option = setOptions.find(setOption => setOption.value === cardSet) || {};

    const cardTypeOptions: SelectProps.Option[] = Object.keys(CardType).filter(v => isNaN(Number(v))).map(cardType => {
      return {
        label: `${cardType[0].toUpperCase()}${cardType.slice(1).toLowerCase()}`,
        value: cardType,
      }
    });
    cardTypeOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedCardTypeOption: SelectProps.Option = cardTypeOptions.find(cardTypeOption => cardTypeOption.value === cardType) || {};

    const cardColorOptions: MultiselectProps.Option[] = Object.keys(CardColor).filter(v => isNaN(Number(v))).map(cardColor => {
      return {
        label: `${cardColor[0].toUpperCase()}${cardColor.slice(1).toLowerCase()}`,
        value: cardColor,
      }
    });
    const selectedCardColorOptions: MultiselectProps.Option[] = cardColorOptions
      .filter(option => Object.keys(CardColor).includes(option.value || ''))
      .filter(option => cardColors.includes(Object(CardColor)[option.value || ''] as CardColor));
    
    const typeOptions: MultiselectProps.Option[] = TypesList.map(t => {
      return {
        label: t,
        value: t,
      }
    });
    const selectedTypes: MultiselectProps.Option[] = typeOptions.filter(option => typeTags.includes(option.value || ''));

    return <>
      {/* Generic */}
      {/* Name: input */}
      {/* Set: select */}
      {/* Card type: select */}
      {/* Card colors: multiselect + and/or segments */}
      {/* Types: multiselect + and/or segments */}

      <FormField label='Name'>
        <Input
          value={cardName}
          onChange={({ detail }) => setCardName(detail.value)}
        />
      </FormField>
      <FormField label='Set'>
        <Select
          selectedOption={selectedSetOption}
          options={setOptions}
          filteringType='auto'
          onChange={({ detail }) => setCardSet(detail.selectedOption.value || 'All')}
        />
      </FormField>
      <FormField label='Card type'>
        <Select
          selectedOption={selectedCardTypeOption}
          options={cardTypeOptions}
          onChange={({ detail }) => {
            if (detail.selectedOption.value !== cardType) {
              setCardType(detail.selectedOption.value || 'All');
              resetNonGenericFields();
            }
          }}
        />
      </FormField>
      <FormFieldWithSegments label='Colors'
        segmentOptions={['and', 'or']}
        currentSegmentOption={cardColorsUnionOption}
        onSegmentOptionChange={(segmentOption: string) => setCardColorsUnionOption(segmentOption)}
      >
        <Multiselect
          selectedOptions={selectedCardColorOptions}
          options={cardColorOptions}
          onChange={({ detail }) => setCardColors(detail.selectedOptions.map(option => Object(CardColor)[option.value || ''] as CardColor)) }
        />
      </FormFieldWithSegments>
      <FormFieldWithSegments label='Types' 
        segmentOptions={['and', 'or']}
        currentSegmentOption={typeTagsUnionOption}
        onSegmentOptionChange={(segmentOption: string) => setTypeTagsUnionOption(segmentOption)}
      >
        <Multiselect
          selectedOptions={selectedTypes}
          options={typeOptions}
          onChange={({ detail }) => setTypeTags(detail.selectedOptions.map(option => option.value || '')) }
        />
      </FormFieldWithSegments>
    </>
  }

  const renderLeaderFields = (): JSX.Element => {
    return <>
      {/* Leader */}
      {/* Life: input + =/>=/<= segments */}
      {/* Power: input + =/>=/<= segments */}
      {/* Attribute: select */}
      {/* Effect text: input */}

      <FormFieldWithSegments label='Life'
        segmentOptions={['=', '>=', '<=']}
        currentSegmentOption={lifeCompareMode}
        onSegmentOptionChange={(segmentOption: string) => setLifeCompareMode(segmentOption)}
      >
        <Input
          value={life}
          type='number'
          onChange={({ detail }) => setLife(detail.value)}
        />
      </FormFieldWithSegments>
      {renderPowerField()}
      {renderAttributeField()}
      {renderEffectTextField()}
    </>
  }

  const renderCharacterFields = (): JSX.Element => {
    return <>
      {/* Character */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Power: input + =/>=/<= segments */}
      {/* Attibute: select */}
      {/* Counter: input + =/>=/<= segments */}
      {/* Effect text: input */}
      {/* Trigger toggle: checkbox */}
      {/* Trigger text: input */}

      {renderCostField()}
      {renderPowerField()}
      {renderAttributeField()}
      <FormFieldWithSegments label='Counter'
        segmentOptions={['=', '>=', '<=']}
        currentSegmentOption={counterCompareMode}
        onSegmentOptionChange={(segmentOption: string) => setCounterCompareMode(segmentOption)}
      >
        <Input
          value={counter}
          type='number'
          onChange={({ detail }) => setCounter(detail.value)}
        />
      </FormFieldWithSegments>
      {renderEffectTextField()}
      {renderTriggerField()}
    </>
  }

  const renderEventFields = (): JSX.Element => {
    return <>
      {/* Event */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Effect text: input */}
      {/* Trigger toggle: checkbox */}
      {/* Trigger text: input */}

      {renderCostField()}
      {renderEffectTextField()}
      {renderTriggerField()}
    </>
  }

  const renderStageFields = (): JSX.Element => {
    return <>
      {/* Stage */}
      {/* Cost: input + =/>=/<= segments */}
      {/* Effect text: input */}

      {renderCostField()}
      {renderEffectTextField()}
    </>
  }

  const renderVanitiesFields = (): JSX.Element => {
    const rarityOptions: SelectProps.Option[] = Object.keys(CardRarity).filter(v => isNaN(Number(v))).map(rarity => {
      return {
        label: `${rarity[0].toUpperCase()}${rarity.slice(1).toLowerCase()}`,
        value: rarity,
      }
    });
    rarityOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedRarityOption: SelectProps.Option = rarityOptions.find(option => option.value === rarity) || {};

    const artVariantOptions: SelectProps.Option[] = Object.keys(ArtVariant).filter(v => isNaN(Number(v))).map(artVariant => {
      return {
        label: `${artVariant[0].toUpperCase()}${artVariant.slice(1).toLowerCase()}`,
        value: artVariant,
      }
    });
    artVariantOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedArtVariantOption: SelectProps.Option = artVariantOptions.find(option => option.value === artVariant) || {};

    const artistOptions: SelectProps.Option[] = ArtistList.map(artist => {
      return {
        label: artist,
        value: artist,
      }
    });
    artistOptions.splice(0, 0, { label: 'All', value: 'All' });
    const selectedArtist: SelectProps.Option = artistOptions.find(option => option.value === artist) || {};

    return <ExpandableSection headerText='Vanities' >
      {/* Vanities - expandable */}
      {/* Card rarity: select */}
      {/* Art variant: select */}
      {/* Artist: select */}

      <FormField label='Rarity' >
        <Select
          selectedOption={selectedRarityOption}
          options={rarityOptions}
          onChange={({ detail }) => setRarity(detail.selectedOption.value || 'All')}
        />
      </FormField>
      <FormField label='Art variant' >
        <Select
          selectedOption={selectedArtVariantOption}
          options={artVariantOptions}
          onChange={({ detail }) => setArtVariant(detail.selectedOption.value || 'All')}
        />
      </FormField>
      <FormField label='Artist' >
        <Select
          selectedOption={selectedArtist}
          options={artistOptions}
          onChange={({ detail }) => setArtist(detail.selectedOption.value || 'All')}
        />
      </FormField>
    </ExpandableSection>
  }

  // ===== FORM =====

  const renderForm = (): JSX.Element => {
    return <SpaceBetween size='m'>
      {renderGenericFields()}
      {cardType === 'LEADER' && renderLeaderFields()}
      {cardType === 'CHARACTER' && renderCharacterFields()}
      {cardType === 'EVENT' && renderEventFields()}
      {cardType === 'STAGE' && renderStageFields()}
      {renderVanitiesFields()}
    </SpaceBetween>
  }

  return <Container disableContentPaddings>
    <div className='filter-content-wrapper'>
      <ExpandToggle/>
      <div className='filter-form-wrapper'>
        {renderForm()}
      </div>
    </div>
  </Container>
}

export default CardSearchFilter;