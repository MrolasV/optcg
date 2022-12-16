import { ArtVariant, CardAttribute, CardColor, CardRarity, CardType, DbCard, SetId } from "setdb/constants";

export type CardPool = {
  card: DbCard,
  quantity: number,
}[];

export interface CardFilter {
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
  effectTextTokens?: string[],
  hasTrigger?: boolean,
  triggerTextTokens?: string[],
  rarity?: CardRarity,
  artVariant?: ArtVariant,
  artist?: string,
}