// enum to string[]
// Object.keys(ENUM).filter(v => isNaN(Number(v)))
//
// string to enum value
// Object(ENUM)[str] as ENUM

export enum SetId {
  P,
  ST01,
  ST02,
  ST03,
  ST04,
  OP01,
}
export const SetNames: {[key: string]: string} = {
  'P': 'Promotional',
  'ST01': 'Starter deck-Straw Hat Crew',
  'ST02': 'Starter deck-Worst Generation',
  'ST03': 'Starter deck-The Seven Warlords of the Sea',
  'ST04': 'Starter deck-Animal Kingdom Pirates',
  'OP01': 'Romance Dawn',
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
export const CardColorHexCodes: string[] = [
  'd6141d', '00946b', '0085c2', '94398b', '000000',
];

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
  SPECIAL_PARALLEL,
}
export const ArtVariantCodes: string[] = [
  'P', 'SP'
]

export enum CardAttribute {
  STRIKE,
  SLASH,
  RANGED,
  WISDOM,
  SPECIAL,
}

//TODO
export const TypesList: string[] = [
  'Straw Hat Crew', 'Supernovas'
]

export interface CollectionCard {
  setId: SetId;
  setNumber: number;
  artVariant?: ArtVariant;
  blockIcon: number;
}

export type DbCard = DbLeaderCard | DbCharacterCard | DbEventCard | DbStageCard;
interface IDbCard {
  setId: SetId;
  setNumber: number;
  cardName: string;
  cardType: CardType;
  cardColors: CardColor[];
  rarity: CardRarity;
  artVariant?: ArtVariant;
  artVariants?: ArtVariant[];
  artist?: string;
  artists?: string[];
  blockIcon: number;
  types: string[];
}

export interface DbLeaderCard extends IDbCard {
  power: number;
  attribute: CardAttribute;
  effectText?: string;
  life: number;
}

export interface DbCharacterCard extends IDbCard {
  cost: number;
  power: number;
  attribute: CardAttribute;
  counter: number;
  effectText?: string;
  triggerText?: string;
}

export interface DbEventCard extends IDbCard {
  cost: number;
  effectText?: string;
  triggerText?: string;
}

export interface DbStageCard extends IDbCard {
  cost: number;
  effectText?: string;
}

export const ArtistList: string[] = [
  'Manga', 'Anime', 
]