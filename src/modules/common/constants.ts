import { ArtVariant, CardAttribute, CardColor, CardRarity, CardType, SetId } from "setdb/constants";

export interface CardFilter {
  inCollection?: string,
  cardName?: string;
  cardSet?: SetId;
  cardType?: CardType,
  cardColors?: CardColor[],
  cardColorsUnionOption?: string,
  typeTags?: string[],
  typeTagsUnionOption?: string,
  life?: number,
  lifeCompareMode?: string,
  power?: number,
  powerCompareMode?: string, 
  cost?: number,
  costCompareMode?: string,
  counter?: number,
  counterCompareMode?: string,
  attribute?: CardAttribute,
  effectText?: string,
  hasTrigger?: boolean,
  triggerText?: string,
  rarity?: CardRarity,
  artVariant?: ArtVariant,
  artist?: string,
}

export enum CardSortOrderBy {
  DEFAULT,
  NAME,
  COST,
  POWER,
  SET,
}

export enum CardSortDirection {
  DESC,
  ASC,
}

export interface CardSort {
  orderBy: CardSortOrderBy;
  direction: CardSortDirection;
}

export const lsWorkingCollectionKey = 'working-collection';
export const lsWorkingCollectionNameKey = 'working-collection-name';
export const lsCollectionListKey = 'collection-list';
export const lsCollectionKey = (name: string) => `collection_${name}`;
export const lsWorkingDeckKey = 'working-deck';
export const lsWorkingDeckNameKey = 'working-deck-name';
export const lsDeckListKey = 'deck-list';
export const lsDeckKey = (name: string) => `deck_${name}`;