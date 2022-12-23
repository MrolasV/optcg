import * as React from 'react';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { TooltipWrapper, PlacesType } from 'react-tooltip';
import { ArtVariantCodes, CardAttribute, CardColorHexCodes, CardType, DbCard, DbCharacterCard, DbLeaderCard, SetId } from 'setdb/constants';
import { capitalizeFirst } from './util';

interface CardTooltipProps {
  place?: PlacesType;
  card?: DbCard;
  children?: React.ReactNode;
}

const CardTooltip = (props: CardTooltipProps): JSX.Element => {
  const { place, card, children } = props;

  if (!card) {
    return <>{children}</>
  }

  const leaderCard = card as DbLeaderCard;
  const characterCard = card as DbCharacterCard;

  // https://blog.prototypr.io/css-only-multi-color-backgrounds-4d96a5569a20
  const c1: string = card.cardColors.length ? `#${CardColorHexCodes[card.cardColors[0]]}` : 'rgba(0,0,0,0)';
  const c2: string = card.cardColors.length <= 1 ? c1 : `#${CardColorHexCodes[card.cardColors[1]]}`;
  const typeTagBg: string = `linear-gradient(to right, ${c1} 50%, ${c2} 50%)`;
  
  const setCode: string = Object.entries(SetId)[card.setId][1] as string;
  const variantString: string = card.hasOwnProperty('artVariant') ? ArtVariantCodes[card.artVariant || 0] : '';

  const costLifeField: string = card.cardType === CardType.LEADER ? 'Life: ' : 'Cost: '; 
  const costLifeText: string = card.cardType === CardType.LEADER ? 
    `${leaderCard.life}` : 
    `${characterCard.cost}`;
  const attributeText: string = card.cardType === CardType.LEADER || card.cardType === CardType.CHARACTER ?
    capitalizeFirst(Object.entries(CardAttribute)[leaderCard.attribute || 0][1] as string) : '';
  const powerText: string = card.cardType === CardType.LEADER || card.cardType === CardType.CHARACTER ?
    `${leaderCard.power}` : '';
  const counterText: string = card.cardType === CardType.CHARACTER ?
    `${characterCard.counter || '-'}` : '';
  const typesText: string = card.types.join('/');
  const effectText: string = characterCard.effectText || '';
  const triggerText: string = (card.cardType === CardType.CHARACTER && characterCard.triggerText) || '';

  const renderContent = (): JSX.Element => {
    return <div className='card-tooltip'>
      <div>
        <div className='card-tooltip_header'>
          <div className='card-tooltip_card-name'>{card.cardName}</div>
          <div className='card-tooltip_card-type-tag'
            style={{
              backgroundImage: typeTagBg
            }}
          >
            {Object.entries(CardType)[card.cardType][1]}
          </div>
        </div>
        <div className='card-tooltip_content'>
          <div><strong>{costLifeField}</strong>{costLifeText}</div>
          {!!attributeText && <div><strong>Attribute: </strong>{attributeText}</div>}
          {!!powerText && <div><strong>Power: </strong>{powerText}</div>}
          {!!counterText && <div><strong>Counter: </strong>{counterText}</div>}
          <div className='card-tooltip_content-long card-tooltip_content-short'><strong>Types: </strong>{typesText}</div>
          {!!effectText && <div className='card-tooltip_content-long'>
            <strong>Effect:</strong>
            <div>{effectText}</div>
          </div>}
          {!!triggerText && <div className='card-tooltip_content-long'>
            <strong>Trigger:</strong>
            <div>{triggerText}</div>  
          </div>}
        </div>
      </div>
      <div className='card-tooltip_footer'>
        <div/>
        <div>{`${setCode}-${card.setNumber.toString().padStart(3, '0')} ${variantString}`}</div>
      </div>
    </div>
  }

  return <TooltipWrapper
    place={place}
    html={ReactDOMServer.renderToString(renderContent())}
  >
    {children}
  </TooltipWrapper>
}

export default CardTooltip;