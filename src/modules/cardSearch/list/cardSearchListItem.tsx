import * as React from 'react';

import { CollectionInventoryItem } from 'modules/collection/constants';
import { ArtVariantCodes, CardColorHexCodes, CardType, DbCharacterCard, DbLeaderCard, SetId } from 'setdb/constants';

import Container from '@cloudscape-design/components/container';
import CardTooltip from 'modules/common/cardTooltip';

interface CardSearchListItemProps {
  inventoryItem: CollectionInventoryItem;
}

const CardSearchListItem = (props: CardSearchListItemProps): JSX.Element => {
  const { card, quantity } = props.inventoryItem;

  // https://blog.prototypr.io/css-only-multi-color-backgrounds-4d96a5569a20
  const c1: string = card.cardColors.length ? `#${CardColorHexCodes[card.cardColors[0]]}` : 'rgba(0,0,0,0)';
  const c2: string = card.cardColors.length <= 1 ? c1 : `#${CardColorHexCodes[card.cardColors[1]]}`;
  const typeTagBg: string = `linear-gradient(to right, ${c1} 50%, ${c2} 50%)`;

  const setCode: string = Object.entries(SetId)[card.setId][1] as string;
  const variantString: string = card.hasOwnProperty('artVariant') ? ArtVariantCodes[card.artVariant || 0] : '';

  const getDetailLine1 = (): JSX.Element => {
    if (card.cardType === CardType.LEADER) {
      const leaderCard = card as DbLeaderCard;
      return <div className='list-item_detail'>{`Life: ${leaderCard.life}`}</div>
    } else {
      const characterCard = card as DbCharacterCard;
      return <div className='list-item_detail'>{`Cost: ${characterCard.cost}`}</div>
    }
  }

  const getDetailLine2 = (): JSX.Element => {
    if (card.cardType === CardType.LEADER || card.cardType === CardType.CHARACTER) {
      const leaderCard = card as DbLeaderCard;
      return <div className='list-item_detail'>{`Power: ${leaderCard.power}`}</div>
    } else {
      return <></>;
    }
  }

  return <CardTooltip card={card} place='left'>
    <Container disableContentPaddings>
      <div className='list-item'>
        <div className='list-item_content'>
          <div>
            <div>
              <div className='list-item_card-name'>{card.cardName}</div>
              {getDetailLine1()}
              {getDetailLine2()}
            </div>
            <div className='list-item_card-type-tag'
              style={{
                backgroundImage: typeTagBg
              }}
            >
              {Object.entries(CardType)[card.cardType][1]}
            </div>
          </div>
          <div className='list-item_bottom-row'>
            <div>{`In collection: ${quantity}`}</div>
            <div>{`${setCode}-${card.setNumber.toString().padStart(3, '0')} ${variantString}`}</div>
          </div>
        </div>
      </div>
    </Container>
  </CardTooltip>
}

export default CardSearchListItem;