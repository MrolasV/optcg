import * as React from 'react';
import { useDrag } from 'react-dnd';

import { CardColor, CollectionCard, DbCard, dbCardImgLink } from 'setdb/constants';
import CardTooltip from 'modules/common/cardTooltip';
import { TooltipWrapper } from 'react-tooltip';
import { CardIllegalReason, CardWarningReason } from './constants';

import Icon from '@cloudscape-design/components/icon';

// Errors
// cardInvariantCount > 4
// cardColor !== leaderColor
//
// Warnings
// poolCount === 0
// cardCount > poolCount

interface BuilderCardProps {
  card: DbCard;
  leaderColors?: CardColor[];
  poolCount: number;
  cardCount: number;
  cardInvariantCount: number;
  removeCardFromDeck: (card: CollectionCard) => void;
}

const BuilderCard = (props: BuilderCardProps): JSX.Element => {
  const { card, leaderColors, poolCount, cardCount, cardInvariantCount, removeCardFromDeck } = props;

  //@ts-ignore
  const [{ isDragging }, dragRef] = useDrag(() => {
    return {
      type: 'builder_card',
      item: card,
      collect: monitor => ({
        isDragging: !!monitor.isDragging()
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          removeCardFromDeck(item as CollectionCard);
        }
      }
    }
  }, [ card, removeCardFromDeck ])

  // TODO: Ban list?
  const checkCardLegality = (): CardIllegalReason | null => {
    if (cardInvariantCount > 4) {
      return CardIllegalReason.OVER_COPIES;
    }
    if (!!leaderColors) {
      for (const cardColor of card.cardColors) {
        if (!leaderColors.includes(cardColor)) {
          return CardIllegalReason.COLOR_MISMATCH;
        }
      }
    }
    return null;
  }
  const illegalReason: CardIllegalReason | null = checkCardLegality();

  const checkCardWarnings = (): CardWarningReason | null => {
    if (poolCount < 0) {
      return null; // _db
    }
    if (poolCount === 0) {
      return CardWarningReason.MISSING_COLLECTION;
    }
    if (cardCount > poolCount) {
      return CardWarningReason.OVER_COLLECTION;
    }
    return null;
  }
  const warningReason: CardWarningReason | null = checkCardWarnings();

  const renderIcon = (): JSX.Element | null => {
    if (!illegalReason && !warningReason) {
      return null;
    }
    if (illegalReason) {
      return <TooltipWrapper place='right' content={illegalReason}>
        <Icon name='status-negative' variant='error' className='builder-emphasize-error'/>
      </TooltipWrapper>;
    }
    if (warningReason) {
      return <TooltipWrapper place='right' content={warningReason}>
        <div className='builder-emphasize-warning-bg' />
        <Icon name='status-warning' variant='warning' className='builder-emphasize-warning'/>
      </TooltipWrapper>;
    }
    return null;
  }

  return <CardTooltip card={card} place='right'>
    <div ref={dragRef}>
      <img src={dbCardImgLink(card)} />
      {renderIcon()}
    </div>
  </CardTooltip>
}

export default BuilderCard;