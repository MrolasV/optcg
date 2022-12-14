export enum SetId {
  P,
  ST01,
  ST02,
  ST03,
  ST04,
  OP01,
}

export enum CardType {
  LEADER,
  CHARACTER,
  EVENT,
  STAGE,
}

export enum CardColor {
  RED,
  GREEN,
  BLUE,
  PURPLE,
  BLACK,
}

export enum CardRarity {
  COMMON,
  UNCOMMON,
  RARE,
  SUPER_RARE,
  SECRET_RARE,
  LEADER,
}

export enum ArtVariant {
  PARALLEL,
  PARALLEL_ALT,
}

export enum CardAttribute {
  STRIKE,
  SLASH,
  RANGED,
  SPECIAL,
}

export type DbCard = DbLeaderCard | DbCharacterCard | DbEventCard | DbStageCard;
interface IDbCard {
  setId: SetId;
  setNumber: number;
  cardName: string;
  cardType: CardType;
  cardColors: CardColor[];
  rarity: CardRarity;
  artVariants?: ArtVariant[];
  blockIcon: number;
  types: string[];
}

export interface DbLeaderCard extends IDbCard {
  power: number;
  attribute: CardAttribute;
  effectText?: string;
  effectTags?: string[]; // TODO
  life: number;
}

export interface DbCharacterCard extends IDbCard {
  cost: number;
  power: number;
  attribute: CardAttribute;
  counter: number;
  effectText?: string;
  effectTags?: string[]; // TODO
  triggerText?: string;
  triggerTags?: string[]; // TODO
}

export interface DbEventCard extends IDbCard {
  cost: number;
  effectText?: string;
  effectTags?: string[]; // TODO
  triggerText?: string;
  triggerTags?: string[]; // TODO
}

export interface DbStageCard extends IDbCard {
  cost: number;
  effectText?: string;
  effectTags?: string[]; // TODO
}