import {
  DbCard,
  SetId,
  CardType,
  CardColor,
  CardRarity,
  CardAttribute,
  TypeTags
} from "setdb/constants";

export const cardList: DbCard[] = [
  {
    setId: SetId.ST08,
    setNumber: 1,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.LEADER,
    artists: [ 'Denim2' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Your Turn] When a Character is K.O.'d, give up to 1 rested DON!! card to this Leader.`,
    life: 5,
  },{
    setId: SetId.ST08,
    setNumber: 2,
    cardName: 'Uta',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Hashimoto Q' ],
    blockIcon: 1,
    types: [ TypeTags.FILM ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.SPECIAL,
    effectText: `This Character cannot be K.O.'d in battle by Leaders.
    [Activate: Main] You may rest this Character: Give up to 1 of your opponent's Characters -2 cost during this turn.`,
  },{
    setId: SetId.ST08,
    setNumber: 3,
    cardName: 'Gaimon',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anderson' ],
    blockIcon: 1,
    types: [ TypeTags.EastBlue ],
    cost: 2,
    power: 4000,
    attribute: CardAttribute.WISDOM,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 4,
    cardName: 'Koby',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Minato Sashima' ],
    blockIcon: 1,
    types: [ TypeTags.Navy ],
    cost: 4,
    power: 1000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Activate: Main] You may rest this Character: K.O. up to 1 of your opponent's Characters with a cost of 2 or less.`,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 5,
    cardName: 'Shanks',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Makitoshi' ],
    blockIcon: 1,
    types: [ TypeTags.RedHairedPirates ],
    cost: 9,
    power: 10000,
    attribute: CardAttribute.SLASH,
    effectText: `[On Play] You may trash 1 card from your hand: K.O. all Characters with a cost of 1 or less.`,
  },{
    setId: SetId.ST08,
    setNumber: 6,
    cardName: 'Shirahoshi',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Suzume Muraichi' ],
    blockIcon: 1,
    types: [ TypeTags.Merfolk ],
    cost: 4,
    power: 0,
    attribute: CardAttribute.WISDOM,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)
    [On Play] Give up to 1 of your opponent's Characters -4 cost during this turn.`,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 7,
    cardName: 'Nefeltari Vivi',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Hatori Kyoka' ],
    blockIcon: 1,
    types: [ TypeTags.Alabasta ],
    cost: 3,
    power: 1000,
    attribute: CardAttribute.SLASH,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)`,
    triggerText: `[Trigger] Play this card.`,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 8,
    cardName: 'Higuma',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'tasaka' ],
    blockIcon: 1,
    types: [ TypeTags.MountainBandits ],
    cost: 1,
    power: 2000,
    attribute: CardAttribute.SLASH,
    effectText: `[On Play] Give up to 1 of your opponent's Characters -2 cost during this turn.`,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 9,
    cardName: 'Makino',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'tasaka' ],
    blockIcon: 1,
    types: [ TypeTags.WindmillVillage ],
    cost: 2,
    power: 0,
    attribute: CardAttribute.WISDOM,
    effectText: `[On Play] If there is a Character with a cost of 0, draw 1 card.`,
    counter: 2000,
  },{
    setId: SetId.ST08,
    setNumber: 10,
    cardName: 'Monkey.D.Garp',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'tasaka' ],
    blockIcon: 1,
    types: [ TypeTags.Navy ],
    cost: 5,
    power: 7000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 11,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Studio Vigor Co.,Ltd' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 3,
    power: 5000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 12,
    cardName: 'Laboon',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anderson' ],
    blockIcon: 1,
    types: [ TypeTags.Animal ],
    cost: 4,
    power: 6000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
  },{
    setId: SetId.ST08,
    setNumber: 13,
    cardName: 'Mr.2.Bon.Kurei(Bentham)',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Ryuda' ],
    blockIcon: 1,
    types: [ TypeTags.FormerBaroqueWorks ],
    cost: 5,
    power: 6000,
    attribute: CardAttribute.STRIKE,
    effectText: `[DON!! x1] At the end of a battle in which this Character battles your opponent's Character, you may K.O. the opponent's Character you battled with. If you do, K.O. this Character.`,
  },{
    setId: SetId.ST08,
    setNumber: 14,
    cardName: 'Gum-Gum Bell',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 2,
    effectText: `[Main] You may add 1 card from the top of your Life cards to your hand: Give up to 1 of your opponent's Characters -7 cost during this turn.`,
  },{
    setId: SetId.ST08,
    setNumber: 15,
    cardName: 'Gum-Gum Pistol',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.BLACK ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    blockIcon: 1,
    types: [ TypeTags.StrawHatCrew ],
    cost: 3,
    effectText: `[Main] K.O. up to 1 of your opponent's Characters with a cost of 2 or less.`,
    triggerText: `[Trigger] Draw 1 card.`,
  },
];
