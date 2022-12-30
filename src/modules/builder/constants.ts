import { CollectionInventory } from "modules/collection/constants";
import { CollectionCard } from "setdb/constants";

export interface Deck {
  name: string;
  leaderCard?: CollectionCard;
  mainCards: CollectionInventory;
}

export enum DeckIllegalReason {
  MISSING_LEADER = 'Deck is missing a leader.',
  MISSING_CARDS = 'Deck does not contain 50 main deck cards.',
  OVER_COPIES = 'Deck contains more than 4 copies of a card.',
  COLOR_MISMATCH = 'Deck contains main deck cards with a color not matching the leader.',
}

export enum DeckWarningReason {
  MISSING_COLLECTION = 'Deck contains cards not in collection.',
  OVER_COLLECTION = 'Deck contains more copies of a card than in collection.',
}

export enum CardIllegalReason {
  OVER_COPIES = 'Deck contains more than 4 copies of this card.',
  COLOR_MISMATCH = 'Card does not match the leaders color/s.'
}

export enum CardWarningReason {
  MISSING_COLLECTION = 'Card not in collection.',
  OVER_COLLECTION = 'Deck contains more copies of this card than in collection.',
}