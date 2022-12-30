import { CardFilter, CardSort, CardSortDirection, CardSortOrderBy } from "modules/common/constants";
import { getLocalStorageItem } from "modules/common/util";
import { ArtVariant, CardType, CollectionCard, DbCard, DbCharacterCard, DbLeaderCard, SetId } from "setdb/constants";
import { Collection, CollectionInventory, CollectionInventoryItem } from "./constants";

export const cardToCardId = (card: DbCard | CollectionCard, ignoreVariant?: boolean): string => {
  return `${card.setId}-${card.setNumber}-${!ignoreVariant && card.hasOwnProperty('artVariant') ? card.artVariant : ''}`;
}

export const dbCardToCollectionCard = (dbCard: DbCard): CollectionCard => {
  const collectionCard: CollectionCard = {
    setId: dbCard.setId,
    setNumber: dbCard.setNumber,
    blockIcon: dbCard.blockIcon,
  }
  if (dbCard.hasOwnProperty('artVariant')) {
    collectionCard.artVariant = dbCard.artVariant;
  }
  return collectionCard;
}

export const filterCollectionInventory = (
  inventory: CollectionInventory, 
  comparativeQuantities: {[cardId: string]: number}, 
  getDbCard: (collectionCard: CollectionCard, useSpecifics?: boolean) => DbCard | undefined,
  cardFilter?: CardFilter,
): CollectionInventory => {
  if (!cardFilter) {
    return inventory;
  }

  return inventory.filter(listItem => {
    const card = getDbCard(listItem.card, true);
    if (!card) {
      return false;
    }
    const leaderCard = card as DbLeaderCard;
    const characterCard = card as DbCharacterCard; // treating event and stage cards as character in filter because no unique fields
    const cardId = cardToCardId(card);

    if (cardFilter.inCollection) {
      if (cardFilter.inCollection === 'in' && !comparativeQuantities[cardId]) {
        return false
      } else if (cardFilter.inCollection === 'out' && !!comparativeQuantities[cardId]) {
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
}

export const sortCollectionInventory = (
  inventory: CollectionInventory, 
  getDbCard: (collectionCard: CollectionCard, useSpecifics?: boolean) => DbCard | undefined,
  cardSort?: CardSort
) => {
  if (!cardSort) {
    return;
  }

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
      return a.setNumber - b.setNumber;
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

  inventory.sort((a: CollectionInventoryItem, b: CollectionInventoryItem) => {
    const _a = getDbCard(a.card, true);
    const _b = getDbCard(b.card, true);

    if (!_a && !_b) {
      return 0;
    } else if (!_a) {
      return 1;
    } else if (!_b) {
      return -1;
    }

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
}

export const addCardToCollection = (card: CollectionCard, collection: Collection): Collection => {
  const inventory = collection.inventory.concat();
  const cardId = cardToCardId(card);
  const matchIndex = inventory.findIndex(inventoryItem => cardToCardId(inventoryItem.card) === cardId);
  if (matchIndex !== -1) {
    inventory[matchIndex].quantity++;
  } else {
    inventory.push({
      card, quantity: 1
    })
  }
  return {
    name: collection.name,
    inventory
  };
}

export const removeCardFromCollection = (card: CollectionCard, collection: Collection): Collection => {
  const cardId = cardToCardId(card);
  const matchIndex = collection.inventory.findIndex(inventoryItem => cardToCardId(inventoryItem.card) === cardId);
  if (matchIndex !== -1) {
    collection.inventory[matchIndex].quantity--;
    if (!collection.inventory[matchIndex].quantity) {
      collection.inventory.splice(matchIndex, 1);
    }
  }
  return collection;
}

const inventoryItemToLocalItem = (item: CollectionInventoryItem): Uint8Array => {
  const card = item.card;
  const set: number = card.setId & 0x3ff;
  const setNumber: number = card.setNumber & 0x3ff;
  const artVariant: number = (card.hasOwnProperty('artVariant') ? (card.artVariant || 0) + 1 : 0) & 0x7;
  const blockId: number = card.blockIcon & 0x7;
  const quantity: number = item.quantity & 0x3f;

  const b1: number = set & 0xff;
  const b2: number = ((set >> 8) & 0x3) | ((setNumber & 0x3f) << 2);
  const b3: number = ((setNumber >> 6) & 0xf) | (artVariant << 4) | ((blockId & 0x1) << 7);
  const b4: number = ((blockId >> 1) & 0x3) | (quantity << 2);
  
  const arr = new Uint8Array(4);
  arr[3] = b1;
  arr[2] = b2;
  arr[1] = b3;
  arr[0] = b4;
  return arr;
}

export const collectionToLocalCollection = (collection: Collection): string => {
  const encodedArr = new Uint8Array(collection.inventory.length * 4);
  collection.inventory.forEach((inventoryItem, index) => {
    const localItem = inventoryItemToLocalItem(inventoryItem);
    localItem.forEach((localItemByte, localItemIndex) => {
      const encodedIndex = localItemIndex + index * 4;
      encodedArr[encodedIndex] = localItemByte;
    });
  });
  let encodedString = '';
  encodedArr.filter(v => { encodedString += String.fromCharCode(v); return false; })
  return btoa(encodedString);
}

const localItemToInventoryItem = (localItem: Uint8Array): CollectionInventoryItem | undefined => {
  const b1 = localItem[3];
  const b2 = localItem[2];
  const b3 = localItem[1];
  const b4 = localItem[0];

  const set: SetId = ((b2 & 0x3) | b1) as SetId;
  const setNumber: number = (b2 >> 2) | ((b3 & 0xf) << 6);
  const artVariantNumber: number = ((b3 >> 4) & 0x7) - 1;
  const blockId: number = (b3 >> 7) | ((b4 & 0x3) << 1);
  const quantity: number = (b4 >> 2);

  const card: CollectionCard = {
    setId: set,
    setNumber: setNumber,
    blockIcon: blockId,
  }
  if (artVariantNumber >= 0) {
    card.artVariant = artVariantNumber;
  }

  return {
    card, quantity
  };
}

export const localCollectionToCollection = (name: string, localCollection: string): Collection => {
  const encodedArr: Uint8Array = new Uint8Array(atob(localCollection).split('').map(c => c.charCodeAt(0)));
  if (encodedArr.length % 4 !== 0) {
    throw `Saved collection "${name}" is corrupted. Please delete`;
  }
  const collection: Collection = {
    name, inventory: []
  }
  for (let i = 0; i < encodedArr.length; i += 4) {
    const localItem: Uint8Array = new Uint8Array([encodedArr[i], encodedArr[i + 1], encodedArr[i + 2], encodedArr[i + 3]]);
    const inventoryItem = localItemToInventoryItem(localItem);
    if (!!inventoryItem) {
      collection.inventory.push(inventoryItem);
    }
  }
  return collection;
}

export const localListPush = (listKey: string, item: string) => {
  const localList: string[] = getLocalStorageItem<string[]>(listKey) || [];
  if (!localList.includes(item)) {
    localList.push(item);
    localStorage.setItem(listKey, JSON.stringify(localList));
  }
}

export const localListRemove = (listKey: string, item: string) => {
  const localList: string[] = getLocalStorageItem<string[]>(listKey) || [];
  if (localList.includes(item)) {
    const filtered: string[] = localList.filter(listItem => listItem !== item);
    localStorage.setItem(listKey, JSON.stringify(filtered));
  }
}
