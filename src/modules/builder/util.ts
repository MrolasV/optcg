import { Collection, CollectionInventory, CollectionInventoryItem } from "modules/collection/constants";
import { cardToCardId, collectionToLocalCollection, localCollectionToCollection } from "modules/collection/util";
import { CardType, CollectionCard, DbCard, SetId } from "setdb/constants";
import { Deck } from "./constants";

export const deckToCollection = (deck: Deck): Collection => {
  const inventoryMap: { [key: string]: CollectionInventoryItem } = {};
  deck.mainCards.forEach(item => {
    const cardId = cardToCardId(item.card);
    if (!inventoryMap.hasOwnProperty(cardId)) {
      inventoryMap[cardId] = {
        card: item.card, quantity: item.quantity
      }
    }
  })
  const inventory: CollectionInventory = Object.values(inventoryMap);
  if (deck.leaderCard) {
    inventory.unshift({
      card: deck.leaderCard,
      quantity: 0,
    });
  }
  return {
    name: deck.name,
    inventory: inventory
  }
}

export const deckToLocalCollection = (deck: Deck): string => {
  const deckAsCollection: Collection = deckToCollection(deck);
  return collectionToLocalCollection(deckAsCollection);
}

export const localCollectionToDeck = (name: string, localCollection: string): Deck => {
  const deckAsCollection: Collection = localCollectionToCollection(name, localCollection);
  const deck: Deck = {
    name: deckAsCollection.name,
    mainCards: deckAsCollection.inventory,
  }
  for (let i = 0; i < deck.mainCards.length; i++) {
    const cardItem = deck.mainCards[i];
    if (cardItem.quantity === 0) {
      deck.leaderCard = cardItem.card;
      deck.mainCards.splice(i, 1);
      break;
    }
  }
  return deck;
}

export const deckToTTSString = (deck: Deck): string => {
  const deckList = ['Exported from OnePiece-CardGame.dev'] // hehe not really
  if (deck.leaderCard) {
    deckList.push(`${Object.values(SetId)[deck.leaderCard.setId]}-${deck.leaderCard.setNumber.toString().padStart(3, '0')}`);
  }
  deck.mainCards.forEach(cardItem => {
    const card = cardItem.card;
    const cardString = `${Object.values(SetId)[card.setId]}-${card.setNumber.toString().padStart(3, '0')}`;
    deckList.push(...Array(cardItem.quantity).fill(cardString));
  })
  return JSON.stringify(deckList);
}

export const deckToUntapString = (deck: Deck, getDbCard: (collectionCard: CollectionCard) => DbCard | undefined): string => {
  let deckList = '// OnePiece Deck';
  if (deck.leaderCard) {
    const leaderCard = getDbCard(deck.leaderCard);
    if (leaderCard) {
      const cardId = `${Object.values(SetId)[leaderCard.setId]}-${leaderCard.setNumber.toString().padStart(3, '0')}`;
      deckList += `\n1 ${cardId} ${leaderCard.cardName}`;
    }
  }
  deck.mainCards.forEach(cardItem => {
    const card = getDbCard(cardItem.card);
    if (card) {
      const cardId = `${Object.values(SetId)[card.setId]}-${card.setNumber.toString().padStart(3, '0')}`;
      deckList += `\n${cardItem.quantity} ${cardId} ${card.cardName}`;
    }
  })
  return deckList;
}

export const getMainDeckSize = (deck: Deck): number => {
  return deck.mainCards.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
}