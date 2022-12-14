import * as React from 'react';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import Tooltip from 'home/tooltip';
import { TooltipWrapper, PlacesType } from 'react-tooltip';
import { ArtVariantCodes, CardAttribute, CardColorHexCodes, CardRarity, CardType, DbCard, dbCardImgLink, DbCharacterCard, DbLeaderCard, SetId } from 'setdb/constants';
import { capitalizeFirst } from './util';

interface CardTooltipProps {
  place?: PlacesType;
  card?: DbCard;
  children?: React.ReactNode;
  noWrapper?: boolean;
  anchorId?: string;
}

const CardTooltip = (props: CardTooltipProps): JSX.Element => {
  const { place, card, children, noWrapper, anchorId } = props;

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
  const triggerText: string = ((card.cardType === CardType.CHARACTER || card.cardType === CardType.EVENT) && characterCard.triggerText) || '';

  const renderContent = (): JSX.Element => {
    return <div className='card-tooltip'>
      <div className='card-tooltip_img'>
        {card && <img src={dbCardImgLink(card)} />}
      </div>
      <div className='card-tooltip_details'>
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
          <div>{card.artist ? <><strong>Artist: </strong>{card.artist}</> : ''}</div>
          <div>
            <div>{capitalizeFirst(Object.values(CardRarity)[card.rarity] as string).replace('_', ' ')}</div>
            <div>{`${setCode}-${card.setNumber.toString().padStart(3, '0')} ${variantString}`}</div>
          </div>
        </div>
      </div>
    </div>
  }

  if (noWrapper) {
    return <div>
      {children}
      <Tooltip place={place} anchorId={anchorId}>
        {renderContent()}
      </Tooltip>
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