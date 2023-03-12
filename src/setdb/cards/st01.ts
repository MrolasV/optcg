import {
  DbCard,
  SetId,
  CardType,
  CardColor,
  CardRarity,
  ArtVariant,
  CardAttribute,
  TypeTags
} from "setdb/constants";

export const cardList: DbCard[] = [
  {
    setId: SetId.ST01,
    setNumber: 1,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.LEADER,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Supernovas, TypeTags.StrawHatCrew ],
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Activate: Main] [Once Per Turn] Give this Leader or 1 of your Characters up to 1 rested DON!! card.`,
    life: 5,
  },{
    setId: SetId.ST01,
    setNumber: 2,
    cardName: 'Usopp',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 2,
    power: 2000,
    attribute: CardAttribute.RANGED,
    counter: 1000,
    effectText: `[DON!! x2] [When Attacking] Your opponent cannot activate a [Blocker] Character that has 5000 or more power during this battle.`,
    triggerText: `[Trigger] Play this card.`,
  },{
    setId: SetId.ST01,
    setNumber: 3,
    cardName: 'Karoo',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Animal, TypeTags.Alabasta ],
    cost: 1,
    power: 3000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
  },{
    setId: SetId.ST01,
    setNumber: 4,
    cardName: 'Sanji',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artVariants: [ ArtVariant.PARALLEL ],
    artists: [ 'Anime', 'Koushi Rokushiro' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 2,
    power: 4000,
    attribute: CardAttribute.STRIKE,
    effectText: `[DON!! x2] This Character gains [Rush].
    (This card can attack on the turn in which it is played.)`,
  },{
    setId: SetId.ST01,
    setNumber: 5,
    cardName: 'Jinbe',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 3,
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: `[DON!! x1] [When Attacking] Up to 1 of your Leader or Character cards other than this card gains +1000 power during this turn.`,
  },{
    setId: SetId.ST01,
    setNumber: 6,
    cardName: 'Tony Tony.Chopper',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Animal, TypeTags.StrawHatCrew ],
    cost: 1,
    power: 1000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)`,
  },{
    setId: SetId.ST01,
    setNumber: 7,
    cardName: 'Nami',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 1,
    power: 1000,
    attribute: CardAttribute.SPECIAL,
    counter: 1000,
    effectText: `[Activate: Main] [Once Per Turn] Give up to 1 rested DON!! card to your Leader or 1 of your Characters.`,
  },{
    setId: SetId.ST01,
    setNumber: 8,
    cardName: 'Nico Robin',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 3,
    power: 5000,
    attribute: CardAttribute.WISDOM,
    counter: 1000,
  },{
    setId: SetId.ST01,
    setNumber: 9,
    cardName: 'Nefeltari Vivi',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Alabasta ],
    cost: 2,
    power: 4000,
    attribute: CardAttribute.SLASH,
    counter: 1000,
  },{
    setId: SetId.ST01,
    setNumber: 10,
    cardName: 'Franky',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 4,
    power: 6000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
  },{
    setId: SetId.ST01,
    setNumber: 11,
    cardName: 'Brook',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.SLASH,
    counter: 2000,
    effectText: `[On Play] Give up to 2 rested DON!! cards to your Leader or 1 of your Characters.`,
  },{
    setId: SetId.ST01,
    setNumber: 12,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Supernovas, TypeTags.StrawHatCrew ],
    cost: 5,
    power: 6000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Rush] (This card can attack on the turn in which it is played.)
    [DON!! x2] [When Attacking] Your opponent cannot activate [Blocker] during this battle.`,
  },{
    setId: SetId.ST01,
    setNumber: 13,
    cardName: 'Roronoa Zoro',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Supernovas, TypeTags.StrawHatCrew ],
    cost: 3,
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: `[DON!! x1] This Character gains +1000 power.`,
  },{
    setId: SetId.ST01,
    setNumber: 14,
    cardName: 'Guard Point',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Animal, TypeTags.StrawHatCrew ],
    cost: 1,
    effectText: `[Counter] Up to 1 of your Leader or Character cards gains +3000 power during this battle.`,
    triggerText: `[Trigger] Up to 1 of your Leader or Character cards gains +1000 power during this turn.`,
  },{
    setId: SetId.ST01,
    setNumber: 15,
    cardName: 'Gum-Gum Jet Pistol',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.Supernovas, TypeTags.StrawHatCrew ],
    cost: 4,
    effectText: `[Main] K.O. up to 1 of your opponent's Characters with 6000 power or less.`,
    triggerText: `[Trigger] Activate this card's [Main] effect.`,
  },{
    setId: SetId.ST01,
    setNumber: 16,
    cardName: 'Diable Jambe',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 1,
    effectText: `[Main] Select up to 1 of your {Straw Hat Crew} type Leader or Character cards. Your opponent cannot activate [Blocker] if that Leader or Character attacks during this turn.`,
    triggerText: `[Trigger] K.O. up to 1 of your opponent's [Blocker] Characters with a cost of 3 or less.`,
  },{
    setId: SetId.ST01,
    setNumber: 17,
    cardName: 'Thousand Sunny',
    cardType: CardType.STAGE,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Kazuyuki Hayashi' ],
    imgObjs: [ '_D.png' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 2,
    effectText: `[Activate: Main] You may rest this Stage: Up to 1 {Straw Hat Crew} type Leader or Character card on your field gains +1000 power during this turn.`,
  },
];