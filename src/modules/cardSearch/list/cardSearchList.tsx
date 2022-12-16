import * as React from 'react';

import { CardFilter, CardSort, CardSortDirection, CardSortOrderBy } from 'modules/common/constants';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { Collection } from 'modules/collection/constants';
import { CardType, DbCard, DbCharacterCard, DbLeaderCard } from 'setdb/constants';

import Container from '@cloudscape-design/components/container';

interface CardSearchListProps {
  cardPool: Collection; // list these
  workingCardPool: Collection; // for quantity counting
  cardSort: CardSort;
  cardFilter: CardFilter;
  quantityMode: 'subtract' | 'show';
}

const CardSearchList = (props: CardSearchListProps): JSX.Element => {
  const { cardPool, workingCardPool, cardSort, cardFilter, quantityMode } = props;

  const cardToCardId = (card: DbCard): string => {
    return `${card.setId}-${card.setNumber}-${card.hasOwnProperty('artVariant') ? card.artVariant : ''}`;
  }

  const workingCardPoolQuantities: {[key: string]: number} = {};
  workingCardPool.cards.forEach(cardData => {
    const cardId = cardToCardId(cardData.card);
    workingCardPoolQuantities[cardId] = cardData.quantity;
  });

   //#region List creation

  const cardListItems: { card: DbCard, quantity: number }[] = cardPool.cards.reduce((acc, cardData) => {
    const baseCardId = `${cardData.card.setId}-${cardData.card.setNumber}-`;
    const baseCard = {...cardData.card};
    if (baseCard.hasOwnProperty('artVariants')) {
      delete baseCard.artVariants;
    }
    if (baseCard.hasOwnProperty('artists')) {
      delete baseCard.artists;
    }

    let artist = cardData.card.artists && cardData.card.artists.length > 0 ? cardData.card.artists[0] : 'Manga';
    let workingQuantity = workingCardPoolQuantities[baseCardId] || 0;
    let quantity = workingQuantity;
    if (quantityMode === 'subtract') { // deck view. will cardPool will be a user collection so no need to worry about art variants existing in pool
      quantity = cardData.quantity - workingQuantity;
    }
    const card: DbCard = {
      ...baseCard,
      artist
    }
    acc.push({ card, quantity });

    cardData.card.artVariants?.forEach((artVariant, index) => {
      const cardId = `${baseCardId}${artVariant}`;
      artist = cardData.card.artists && cardData.card.artists.length > index + 1 ? cardData.card.artists[index + 1] : 'Manga';
      workingQuantity = workingCardPoolQuantities[cardId] || 0;
      quantity = workingQuantity;
      if (quantityMode === 'subtract') {
        quantity = cardData.quantity - workingQuantity;
      }
      const cardVariant: DbCard = {
        ...baseCard,
        artVariant, artist
      }
      acc.push({ card: cardVariant, quantity });
    });
    return acc;
  }, [] as { card: DbCard, quantity: number }[]);

  //#endregion

  //#region Filtering

  const filteredListItems: { card: DbCard, quantity: number }[] = cardListItems.filter(listItem => {
    const card = listItem.card;
    const leaderCard = card as DbLeaderCard;
    const characterCard = card as DbCharacterCard; // treating event and stage cards as character in filter because no unique fields
    const cardId = cardToCardId(card);

    if (cardFilter.inCollection) {
      if (cardFilter.inCollection === 'in' && !workingCardPoolQuantities[cardId]) {
        return false
      } else if (cardFilter.inCollection === 'out' && !!workingCardPoolQuantities[cardId]) {
        return false;
      }
    }

    if (cardFilter.cardName && !card.cardName.toLowerCase().includes(cardFilter.cardName.toLowerCase())) {
      return false;
    }
    if (cardFilter.hasOwnProperty('cardSet') && card.setId !== cardFilter.cardSet) {
      return false;
    }
    if (cardFilter.hasOwnProperty('cardType') && card.cardType !== cardFilter.cardType) {
      return false;
    }
    if (cardFilter.cardColors && (cardFilter.cardColorsUnionOption !== 'or' || cardFilter.cardColors.length)) {
      let orFlag = false;
      for (const cardColor of cardFilter.cardColors) {
        if (cardFilter.cardColorsUnionOption === 'and' && !card.cardColors.includes(cardColor)) {
          return false;
        }
        if (card.cardColors.includes(cardColor)) {
          orFlag = true;
        }
      }
      if (cardFilter.cardColorsUnionOption === 'or' && !orFlag) {
        return false;
      }
    }
    if (cardFilter.typeTags && (cardFilter.typeTagsUnionOption !== 'or' || cardFilter.typeTags.length)) {
      let orFlag = false;
      for (const typeTag of cardFilter.typeTags) {
        if (cardFilter.typeTagsUnionOption === 'and' && !card.types.includes(typeTag)) {
          return false;
        }
        if (card.types.includes(typeTag)) {
          orFlag = true;
        }
      }
      if (cardFilter.typeTagsUnionOption === 'or' && !orFlag) {
        return false;
      }
    }

    if (cardFilter.hasOwnProperty('life') && cardFilter.lifeCompareMode) {
      if (card.cardType !== CardType.LEADER) {
        return false;
      }
      if (cardFilter.lifeCompareMode === '=' && leaderCard.life !== cardFilter.life) {
        return false
      }
      if (cardFilter.lifeCompareMode === '>=' && leaderCard.life < (cardFilter.life || 0)) {
        return false;
      }
      if (cardFilter.lifeCompareMode === '<=' && leaderCard.life > (cardFilter.life || 0)) {
        return false;
      }
    }
    if (cardFilter.hasOwnProperty('power') && cardFilter.powerCompareMode) {
      if (card.cardType !== CardType.LEADER && card.cardType !== CardType.CHARACTER) {
        return false;
      }
      if (cardFilter.powerCompareMode === '=' && leaderCard.power !== cardFilter.power) {
        return false;
      }
      if (cardFilter.powerCompareMode === '>=' && leaderCard.power < (cardFilter.power || 0)) {
        return false;
      }
      if (cardFilter.powerCompareMode === '<=' && leaderCard.power > (cardFilter.power || 0)) {
        return false;
      }
    }
    if (cardFilter.hasOwnProperty('cost') && cardFilter.costCompareMode) {
      if (card.cardType === CardType.LEADER) {
        return false;
      }
      if (cardFilter.costCompareMode === '=' && characterCard.cost !== cardFilter.cost) {
        return false;
      }
      if (cardFilter.costCompareMode === '>=' && characterCard.cost < (cardFilter.cost || 0)) {
        return false;
      }
      if (cardFilter.costCompareMode === '<=' && characterCard.cost > (cardFilter.cost || 0)) {
        return false;
      }
    }
    if (cardFilter.hasOwnProperty('counter') && cardFilter.counterCompareMode) {
      if (card.cardType !== CardType.CHARACTER) {
        return false;
      }
      if (cardFilter.counterCompareMode === '=' && characterCard.counter !== cardFilter.counter) {
        return false;
      }
      if (cardFilter.counterCompareMode === '>=' && characterCard.counter < (cardFilter.counter || 0)) {
        return false;
      }
      if (cardFilter.counterCompareMode === '<=' && characterCard.counter > (cardFilter.counter || 0)) {
        return false;
      }
    }
    if (cardFilter.hasOwnProperty('attribute')) {
      if (card.cardType !== CardType.LEADER && card.cardType !== CardType.CHARACTER) {
        return false;
      }
      if (leaderCard.attribute !== cardFilter.attribute) {
        return false;
      }
    }

    if (cardFilter.effectText) {
      if (!card.effectText) {
        return false;
      }
      if (!card.effectText.toLowerCase().includes(cardFilter.effectText)) {
        return false;
      }
    }

    if (cardFilter.hasTrigger) {
      if (!characterCard.triggerText) {
        return false;
      }
      if (cardFilter.triggerText && !characterCard.triggerText.toLowerCase().includes(cardFilter.triggerText)) {
        return false;
      }
    }

    if (cardFilter.hasOwnProperty('rarity') && card.rarity !== cardFilter.rarity) {
      return false;
    }
    if (cardFilter.hasOwnProperty('artVariant') && card.artVariant !== cardFilter.artVariant) {
      return false;
    }
    if (cardFilter.artist && card.artist !== cardFilter.artist) {
      return false;
    }

    return true;
  });

  //#endregion

  //#region Sorting

  const typeSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    return _a.cardType - _b.cardType;
  }
  const costSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    if (!a.hasOwnProperty('cost') && !b.hasOwnProperty('cost')) {
      return 0;
    } else if (!a.hasOwnProperty('cost')) {
      return 1;
    } else if (!b.hasOwnProperty('cost')) {
      return -1;
    } else {
      const __a = _a as DbCharacterCard;
      const __b = _b as DbCharacterCard;
      return __b.cost - __a.cost;
    }
  }
  const powerSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    if (!a.hasOwnProperty('power') && !b.hasOwnProperty('power')) {
      return 0;
    } else if (!a.hasOwnProperty('power')) {
      return 1;
    } else if (!b.hasOwnProperty('power')) {
      return -1;
    } else {
      const __a = _a as DbCharacterCard;
      const __b = _b as DbCharacterCard;
      return __b.power - __a.power;
    }
  }
  const nameSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    if (_a.cardName < _b.cardName) {
      return -1;
    } else if (_a.cardName > _b.cardName) {
      return 1;
    }
    return 0;
  }
  const setSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    if (_a.setId === _b.setId) {
      return _a.setNumber - _b.setNumber;
    } else {
      return _b.setId - _a.setId;
    }
  }
  const variantSortFunc = (a: DbCard, b: DbCard) => {
    const _a = cardSort.direction === CardSortDirection.DESC ? a : b;
    const _b = cardSort.direction === CardSortDirection.DESC ? b : a;
    if (!a.hasOwnProperty('artVariant') && !b.hasOwnProperty('artVariant')) {
      return 0;
    } else if (!a.hasOwnProperty('artVariant')) {
      return -1;
    } else if (!b.hasOwnProperty('artVariant')) {
      return 1;
    } else {
      return (_a.artVariant || 0) - (_b.artVariant || 0);
    }
  }

  filteredListItems.sort((a: { card: DbCard, quantity: number }, b: { card: DbCard, quantity: number }) => {
    const _a = a.card;
    const _b = b.card;

    const typeSortValue = typeSortFunc(_a, _b);
    const costSortValue = costSortFunc(_a, _b);
    const powerSortValue = powerSortFunc(_a, _b);
    const nameSortValue = nameSortFunc(_a, _b);
    const setSortValue = setSortFunc(_a, _b);
    const variantSortValue = variantSortFunc(_a, _b);

    // orders
    // "default" => type > cost > power > name > set > variant
    // "name"    => name > type > cost > power > set > variant
    // "cost"    => cost > type > power > name > set > variant
    // "power"   => power > type > cost > name > set > variant
    // "set"     => set > variant

    if (cardSort.orderBy === CardSortOrderBy.DEFAULT) {
      return typeSortValue || costSortValue || powerSortValue || nameSortValue || setSortValue || variantSortValue;
    } else if (cardSort.orderBy === CardSortOrderBy.NAME) {
      return nameSortValue || typeSortValue || costSortValue || powerSortValue || setSortValue || variantSortValue;
    } else if (cardSort.orderBy === CardSortOrderBy.COST) {
      return costSortValue || typeSortValue || powerSortValue || nameSortValue || setSortValue || variantSortValue;
    } else if (cardSort.orderBy === CardSortOrderBy.POWER) {
      return powerSortValue || typeSortValue || costSortValue || nameSortValue || setSortValue || variantSortValue;
    } else if (cardSort.orderBy === CardSortOrderBy.SET) {
      return setSortValue || variantSortValue;
    }

    return 0;
  });

  //#endregion

  //@ts-ignore
  const renderListItem = ({ index, style }) => (
    <div style={{
      ...style,
      paddingLeft: '8px',
      width: 'calc(100% - 16px)',
    }}>
      <Container
        disableContentPaddings
      >
        <pre>{`${cardToCardId(filteredListItems[index].card)} x${filteredListItems[index].quantity}: ${filteredListItems[index].card.cardName}`}</pre>
      </Container>
    </div>
  )

  return <div className='scroller-wrapper'>
    <AutoSizer disableWidth>
      {({height, width}) =>
        <List
          height={height}
          itemCount={filteredListItems.length}
          itemSize={50}
          width={width}
        >
          {renderListItem}
        </List>
      }
    </AutoSizer>
  </div>
}

export default CardSearchList;