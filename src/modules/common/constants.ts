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