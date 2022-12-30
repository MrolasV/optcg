import * as React from 'react';
import { useState } from 'react';

import ExpandToggle from 'modules/cardSearch/filter/expandToggle';
import { Deck } from './constants';
import { useDatabase } from 'setdb/useDatabase';
import { CardAttribute, CardType, DbCard, DbCharacterCard } from 'setdb/constants';
import { FixedSizeList as List } from 'react-window';
import { TooltipWrapper } from 'react-tooltip';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Checkbox from '@cloudscape-design/components/checkbox';

interface BuilderAnalysisWindowProps {
  workingDeck: Deck
}

const BuilderAnalysisWindow = (props: BuilderAnalysisWindowProps): JSX.Element => {
  const { workingDeck } = props;
  const { getDbCard } = useDatabase();

  const [ curve, setCurve ] = useState<string>('power');
  const [ collapseTypes, setCollapseTypes ] = useState<boolean>(false);

  const deckDbCards: DbCard[] = [];
  if (workingDeck.leaderCard) {
    const deckDbCard = getDbCard(workingDeck.leaderCard);
    if (deckDbCard) {
      deckDbCards.push(deckDbCard);
    }
  }
  workingDeck.mainCards.forEach(deckCardItem => {
    const deckDbCard = getDbCard(deckCardItem.card);
    if (deckDbCard) {
      deckDbCards.push(...Array(deckCardItem.quantity).fill(deckDbCard));
    }
  })

  //#region Curves

  const getPowerBreakdown = (): { x: string, y: number }[] => {
    const powerCounts: {[power: number]: number} = {};
    let noPowerCount: number = 0;
    deckDbCards.forEach(deckDbCard => {
      if (deckDbCard.cardType === CardType.LEADER || deckDbCard.cardType === CardType.CHARACTER) {
        const characterCard = deckDbCard as DbCharacterCard;
        powerCounts[characterCard.power] = (powerCounts[characterCard.power] || 0) + 1;
      } else {
        noPowerCount++;
      }
    });
    const powerBreakdown: { x: string, y: number }[] = [];
    if (noPowerCount) {
      powerBreakdown.push({ x: 'N/A', y: noPowerCount });
    }
    const maxPower = Object.keys(powerCounts).reduce((acc, curr) => {
      return Math.max(acc, Number(curr));
    }, 0);
    for (let power = 0; power <= maxPower; power += 1000) {
      powerBreakdown.push({
        x: power.toString(),
        y: powerCounts[power] || 0,
      });
    }
    return powerBreakdown;
  }

  const getCostBreakdown = (): { x: string, y: number }[] => {
    const costCounts: {[cost: number]: number} = {};
    deckDbCards.forEach(deckDbCard => {
      if (deckDbCard.cardType !== CardType.LEADER) {
        const characterCard = deckDbCard as DbCharacterCard;
        costCounts[characterCard.cost] = (costCounts[characterCard.cost] || 0) + 1;
      }
    });
    const costBreakdown: { x: string, y: number }[] = [];
    const maxCost = Object.keys(costCounts).reduce((acc, curr) => {
      return Math.max(acc, Number(curr));
    }, 0);
    for (let cost = 0; cost <= maxCost; cost++) {
      costBreakdown.push({
        x: cost.toString(),
        y: costCounts[cost] || 0,
      });
    }
    return costBreakdown;
  }

  const getAttributeBreakdown = (): { x: string, y: number }[] => {
    const attributeCounts: {[attribute: number]: number} = {};
    let noAttributeCount: number = 0;
    deckDbCards.forEach(deckDbCard => {
      if (deckDbCard.cardType === CardType.LEADER || deckDbCard.cardType === CardType.CHARACTER) {
        const characterCard = deckDbCard as DbCharacterCard;
        attributeCounts[characterCard.attribute] = (attributeCounts[characterCard.attribute] || 0) + 1;
      } else {
        noAttributeCount++;
      }
    });
    const attributeBreakdown: { x: string, y: number }[] = [];
    if (noAttributeCount) {
      attributeBreakdown.push({ x: 'N/A', y: noAttributeCount });
    }
    Object.entries(attributeCounts).forEach(([attribute, count]) => {
      attributeBreakdown.push({
        x: (Object.values(CardAttribute)[Number(attribute)] || '') as string,
        y: count
      })
    });
    return attributeBreakdown;
  }

  const getCurveSeries = (): { x: string, y: number }[] => {
    switch(curve) {
      case 'power': return getPowerBreakdown();
      case 'cost': return getCostBreakdown();
      case 'attribute': return getAttributeBreakdown();
      default: return[];
    }
  }
  const curveSeries: { x: string, y: number }[] = getCurveSeries();

  const curveOptions: SelectProps.Option[] = [
    { label: 'Power', value: 'power' },
    { label: 'Cost', value: 'cost' },
    { label: 'Attribute', value: 'attribute' },
  ]
  const selectedCurveOption: SelectProps.Option = curveOptions.find(option => option.value === curve) || {};

  const renderCurves = (): JSX.Element => {
    return <div className='builder_analysis-curves'>
      <Header variant='h3'>Curves</Header>
      <Select
        options={curveOptions}
        selectedOption={selectedCurveOption}
        onChange={({ detail }) => setCurve(detail.selectedOption.value || 'power')}
      />
      <BarChart
        series={[{
          title: 'Count',
          type: 'bar',
          data: curveSeries,
        }]}
        xScaleType='categorical'
        hideFilter
        hideLegend
        horizontalBars
        height={250}
      />
    </div>
  }

  //#endregion

  //#region Type tags

  const getTypeTagItems = (): {types: string, count: number}[] => {
    const typeTagsObj: {[typeTag: string]: number} = {};
    deckDbCards.forEach(dbCard => {
      if (collapseTypes) {
        const typeTags = dbCard.types.concat();
        typeTags.sort();
        const typeTagsKey: string = typeTags.join('/');
        typeTagsObj[typeTagsKey] = (typeTagsObj[typeTagsKey] || 0) + 1;
      } else {
        dbCard.types.forEach(dbCardType => {
          typeTagsObj[dbCardType] = (typeTagsObj[dbCardType] || 0) + 1;
        });
      }
    });
    const typeTagItems: {types: string, count: number}[] = Object.entries(typeTagsObj).map(([typeString, count]) => {
      return {
        types: typeString,
        count
      }
    });
    typeTagItems.sort((a, b) => b.count - a.count);
    return typeTagItems;
  }
  const typeTagItems = getTypeTagItems();

  //@ts-ignore
  const TypeTagListItem = ({ index, style, data }) => {
    const itemData = data[index];
    return <div style={style} className='builder_analysis-type-item'>
      <div>
        <TooltipWrapper place='right' content={itemData.types}>
          <div className='builder_analysis-type-item-label'>{itemData.types}</div>
        </TooltipWrapper>
        <div className='builder_analysis-type-item-count'>{itemData.count}</div>
      </div>
    </div>
  }

  const renderTypeTags = (): JSX.Element => {
    return <div>
      <Header variant='h3'>Types</Header>
      <Checkbox
        checked={collapseTypes}
        onChange={({ detail }) => setCollapseTypes(detail.checked)}
      >Collapse types</Checkbox>
      <List
        height={350}
        itemCount={typeTagItems.length}
        itemSize={30}
        width={218}
        itemData={typeTagItems}
      >
        {TypeTagListItem}
      </List>
    </div>
  }

  //#endregion

  return <Container disableContentPaddings>
    <div className='builder_analysis-content-wrapper'>
      <ExpandToggle
        text='DECK ANALYSIS'
        side='left'
      />
      <div className='builder_analysis-content'>
        {renderCurves()}
        {renderTypeTags()}
      </div>
    </div>
  </Container>
}

export default BuilderAnalysisWindow;