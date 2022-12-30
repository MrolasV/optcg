// enum to string[]
// Object.keys(ENUM).filter(v => isNaN(Number(v)))
//
// string to enum value
// Object(ENUM)[str] as ENUM
//
// enum value to string
// Object.values(ENUM)[v]

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
  PROMOTIONAL,
}

export enum ArtVariant {
  PARALLEL,
  SPECIAL_PARALLEL,
  BOX_TOPPER,
}
export const ArtVariantCodes: string[] = [
  'P', 'SP', 'BT'
]
export const ArtVariantImgPostfixes: string[] = [
  '_p1', '_p2', '_p1'
]

export enum CardAttribute {
  STRIKE,
  SLASH,
  RANGED,
  WISDOM,
  SPECIAL,
}

export enum TypeTags {
  StrawHatCrew = 'Straw Hat Crew',
  Supernovas = 'Supernovas',
  HeartPirates = 'Heart Pirates',
  FILM = 'FILM',
  LandOfWano = 'Land of Wano',
  CaribouPirates = 'Caribou Pirates',
  BeautifulPirates = 'Beautiful Pirates',
  Minks = 'Minks',
  Animal = 'Animal',
  HapposuiArmy = 'Happosui Army',
  FishMan = 'Fish-Man',
  Giant = 'Giant',
  NewGiantPirates = 'New Giant Pirates',
  BartoClub = 'Barto Club',
  FormerWhitebeardPirates = 'Former Whitebeard Pirates',
  KouzukiClan = 'Kouzuki Clan',
  TheAkazayaNine = 'The Akazaya Nine',
  KidPirates = 'Kid Pirates',
  Navy = 'Navy',
  DrakePirates = 'Drake Pirates',
  HawkinsPirates = 'Hawkins Pirates',
  TheSevenWarlordsOfTheSea = 'The Seven Warlords of the Sea',
  DonquixotePirates = 'Donquixote Pirates',
  TheFourEmperors = 'The Four Emperors',
  AnimalKingdomPirates = 'Animal Kingdom Pirates',
  BaroqueWorks = 'Baroque Works',
  ArlongPirates = 'Arlong Pirates',
  BuggyPirates = 'Buggy Pirates',
  PunkHazard = 'Punk Hazard',
  KriegPirates = 'Krieg Pirates',
  ThrillerBarkPirates = 'Thriller Bark Pirates',
  Scientist = 'Scientist',
  BiologicalWeapon = 'Biological Weapon',
  RevolutionaryArmy = 'Revolutionary Army',
  Dressrosa = 'Dressrosa',
  KujaPirates = 'Kuja Pirates',
  KurozumiClan = 'Kurozumi Clan',
  OnAirPirates = 'On-Air Pirates',
  SMILE = 'SMILE',
  Smile = 'Smile',
  RedHairedPirates = 'Red-Haired Pirates',
  Alabasta = 'Alabasta',
  FiretankPirates = 'Firetank Pirates',
  FallenMonkPirates = 'Fallen Monk Pirates',
  BonneyPirates = 'Bonney Pirates',
  TheSunPirates = 'The Sun Pirates',
  BuggysDelivery = `Buggy's Delivery`,
  BlackbeardPirates = 'Blackbeard Pirates',
  JellyfishPirates = 'Jellyfish Pirates',
  WhitebeardPirates = 'Whitebeard Pirates',
}
export const TypesList: string[] = Object.values(TypeTags);

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
  imgObj?: string;
  imgObjs?: string[];
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

export const dbCardImgLink = (dbCard: DbCard) => {
  return cardImgLink(dbCard.setId, dbCard.setNumber, dbCard.artVariant);
}

export const cardImgLink = (setId: SetId, setNumber: number, artVariant?: ArtVariant) => {
  const setString: string = Object.values(SetId)[setId] as string;
  const setNumberString: string = setNumber.toString().padStart(3, '0');
  const artVariantString = artVariant !== undefined ? ArtVariantImgPostfixes[artVariant] : '';
  return `https://en.onepiece-cardgame.com/images/cardlist/card/${setString}-${setNumberString}${artVariantString}.png`
  // return `https://s3.amazonaws.com/prod.bandaitcgplus.files.api/card_image/OP-EN/${setString}/${setString}-${setNumberString}${artVariant}`;
}