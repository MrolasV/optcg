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
  ST05,
  ST06,
  OP02,
  OP03,
  ST07,
  ST08,
  ST09,
  OP04,
  ST10,
  OP05,
}
export const SetNames: {[key: string]: string} = {
  'P': 'Promotional',
  'ST01': 'Starter deck-Straw Hat Crew',
  'ST02': 'Starter deck-Worst Generation',
  'ST03': 'Starter deck-The Seven Warlords of the Sea',
  'ST04': 'Starter deck-Animal Kingdom Pirates',
  'OP01': 'Romance Dawn',
  'ST05': 'Starter deck-ONE PIECE FILM edition',
  'ST06': 'Starter deck-Absolute Justice',
  'OP02': 'Paramount War',
  'OP03': 'Pillars of Strength',
  'ST07': 'Starter deck-Big Mom Pirates',
  'ST08': 'Starter deck-Monkey D. Luffy',
  'ST09': 'Starter deck-Yamato',
  'OP04': 'Kingdoms of Intrigue',
  'ST10': 'Ultra deck-The Three Captains',
  'OP05': 'Awakening of the New Era',
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
  YELLOW,
}
export const CardColorHexCodes: string[] = [
  'd6141d', '00946b', '0085c2', '94398b', '000000', 'f6e649',
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
  NeoNavy = 'Neo Navy',
  ThePiratesFest = 'The Pirates Fest',
  Grantesoro = 'Grantesoro',
  GoldenLionPirates = 'Golden Lion Pirates',
  MountainBandits = 'Mountain Bandits',
  WhitebeardPiratesAllies = 'Whitebeard Pirates Allies',
  WindmillVillage = 'Windmill Village',
  SpadePirates = 'Spade Pirates',
  ImpelDown = 'Impel Down',
  FormerBaroqueWorks = 'Former Baroque Works',
  WorldPirates = 'World Pirates',
  JailerBeast = 'Jailer Beast',
  FormerNavy = 'Former Navy',
  ODYSSEY = 'ODYSSEY',
  EastBlue = 'East Blue',
  BlackCatPirates = 'Black Cat Pirates',
  AlvidaPirates = 'Alvida Pirates',
  WaterSeven = 'Water Seven',
  GalleyLa = 'Galley-La Company',
  TheFrankyFamily = 'The Franky Family',
  Merfolk = 'Merfolk',
  CP9 = 'CP9',
  WorldGovernment = 'World Government',
  CP6 = 'CP6',
  CP7 = 'CP7',
  BigMomPirates = 'Big Mom Pirates',
  Homies = 'Homies',
  TheVinsmokeFamily = 'The Vinsmoke Family',
  SniperIsland = 'Sniper Island',
  Plague = 'Plague',
  YontaMariaFleet = 'Yonta Maria Fleet',
  CP0 = 'CP0',
  TheTontattas = 'The Tontattas',
  TheHouseOfLambs = 'The House of Lambs',
  WholeCakeIsland = 'Whole Cake Island',
  BellamyPirates = 'Bellamy Pirates',
  KingdomOfProdence = 'Kingdom of Prodence',
  GoaKingdom = 'Goa Kingdom',
  CelestialDragons = 'Celestial Dragons',
  MaryGeoise = 'Mary Geoise',
  SkyIsland = 'Sky Island',
  Vassals = 'Vassals',
  TheMoon = 'The Moon',
}
export const TypesList: string[] = Object.values(TypeTags);

export enum EffectTag {
  // Condition
  DON_ATTACH = 'DON!! xX',
  ONCE_PER_TURN = 'Once Per Turn',
  YOUR_TURN = 'Your Turn',
  OPPONENTS_TURN = `Opponent's Turn`,

  // Trigger
  ACTIVATE_MAIN = 'Activate: Main',
  END_OF_TURN = 'End of Turn',
  ON_PLAY = 'On Play',
  WHEN_ATTACKING = 'When Attacking',
  ON_BLOCK = 'On Block',
  EVENT_MAIN = 'Main',
  EVENT_COUNTER = 'Counter',

  // Cost
  DON_MINUS = 'DON!! -X',
  DON_ACTIVATE = 'DON!! ⓧ',

  // Effect
  BLOCKER = 'Blocker',
  RUSH = 'Rush',
  BANISH = 'Banish',
  DOUBLE_ATTACK = 'Double Attack',
  REDUCE_COST = 'Reduce Cost',
}
export const EffectTagList: string[] = Object.values(EffectTag);
export const EffectTagGroups: {[group: string]: EffectTag[]} = {
  'Condition': [
    EffectTag.DON_ATTACH,
    EffectTag.ONCE_PER_TURN,
    EffectTag.YOUR_TURN,
    EffectTag.OPPONENTS_TURN,
  ],
  'Trigger': [
    EffectTag.ACTIVATE_MAIN,
    EffectTag.END_OF_TURN,
    EffectTag.ON_PLAY,
    EffectTag.WHEN_ATTACKING,
    EffectTag.ON_BLOCK,
    EffectTag.EVENT_MAIN,
    EffectTag.EVENT_COUNTER,
  ],
  'Cost': [
    EffectTag.DON_MINUS,
    EffectTag.DON_ACTIVATE,
  ],
  'Effect': [
    EffectTag.BLOCKER,
    EffectTag.RUSH,
    EffectTag.BANISH,
    EffectTag.DOUBLE_ATTACK,
    EffectTag.REDUCE_COST,
  ],
}

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