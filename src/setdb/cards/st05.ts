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
    setId: SetId.ST05,
    setNumber: 1,
    cardName: 'Shanks',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.LEADER,
    artists: [ 'Manga' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.TheFourEmperors, TypeTags.RedHairedPirates ],
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: `[Activate: Main] [Once Per Turn] DON!! -3 (You may return the specified number of DON!! cards from your field to your DON!! deck.): All of your {FILM} type Characters gain +2000 power during this turn.`,
    life: 5,
  },{
    setId: SetId.ST05,
    setNumber: 2,
    cardName: 'Ain',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.NeoNavy ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[On Play] Add up to 1 DON!! card from your DON!! deck and rest it.`,
  },{
    setId: SetId.ST05,
    setNumber: 3,
    cardName: 'Ann',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.ThePiratesFest ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)`,
  },{
    setId: SetId.ST05,
    setNumber: 4,
    cardName: 'Uta',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.SPECIAL,
    counter: 1000,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)
    [On Block] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Rest up to 1 of your opponent's Characters with a cost of 5 or less.`,
  },{
    setId: SetId.ST05,
    setNumber: 5,
    cardName: 'Carina',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.Grantesoro ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.WISDOM,
    counter: 1000,
    effectText: `[Activate: Main] [Once Per Turn] You may rest this Character and trash 1 {FILM} type card from your hand: If your opponent has more DON!! cards on their field than you, add 2 DON!! cards from your DON!! deck and rest them.`,
  },{
    setId: SetId.ST05,
    setNumber: 6,
    cardName: 'Gild Tesoro',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.Grantesoro ],
    cost: 5,
    power: 6000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[When Attacking] DON!! -2 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Draw 2 cards.`,
  },{
    setId: SetId.ST05,
    setNumber: 7,
    cardName: 'Gordon',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM ],
    cost: 1,
    power: 3000,
    attribute: CardAttribute.WISDOM,
    counter: 1000,
  },{
    setId: SetId.ST05,
    setNumber: 8,
    cardName: 'Shiki',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.GoldenLionPirates ],
    cost: 6,
    power: 7000,
    attribute: CardAttribute.SLASH,
    counter: 1000,
    effectText: `If you have 8 or more DON!! cards on your field, this Character cannot be K.O.'d in battle.`,
  },{
    setId: SetId.ST05,
    setNumber: 9,
    cardName: 'Scarlet',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.Animal, TypeTags.GoldenLionPirates ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.STRIKE,
    counter: 1000,
    triggerText: `[Trigger] Play this card.`,
  },{
    setId: SetId.ST05,
    setNumber: 10,
    cardName: 'Zephyr',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.NeoNavy ],
    cost: 7,
    power: 8000,
    attribute: CardAttribute.STRIKE,
    effectText: `When this Character battles <Strike> attribute Characters, this Character gains +3000 power during this turn.
    [Activate: Main] [Once Per Turn] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): This Character gains +2000 power during this turn.`,
  },{
    setId: SetId.ST05,
    setNumber: 11,
    cardName: 'Douglas Bullet',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.ThePiratesFest ],
    cost: 8,
    power: 10000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[Activate: Main] [Once Per Turn] DON!! -4 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Rest up to 2 of your opponent's Characters with a cost of 6 or less. Then, this Character gains [Double Attack] during this turn.
    (This card deals 2 damage.)`,
  },{
    setId: SetId.ST05,
    setNumber: 12,
    cardName: 'Baccarat',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.Grantesoro ],
    cost: 3,
    power: 5000,
    attribute: CardAttribute.SPECIAL,
    counter: 1000,
  },{
    setId: SetId.ST05,
    setNumber: 13,
    cardName: 'Bins',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.NeoNavy ],
    cost: 4,
    power: 6000,
    attribute: CardAttribute.SPECIAL,
    counter: 1000,
  },{
    setId: SetId.ST05,
    setNumber: 14,
    cardName: 'Buena Festa',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.ThePiratesFest ],
    cost: 1,
    power: 0,
    attribute: CardAttribute.WISDOM,
    counter: 2000,
    effectText: `[On Play] Look at 5 cards from the top of your deck; reveal up to 1 {FILM} type card other than [Buena Festa] and add it to your hand. Then, place the rest at the bottom of your deck in any order.`,
  },{
    setId: SetId.ST05,
    setNumber: 15,
    cardName: 'Dr. Indigo',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.Scientist, TypeTags.GoldenLionPirates ],
    cost: 2,
    power: 4000,
    attribute: CardAttribute.WISDOM,
    counter: 1000,
  },{
    setId: SetId.ST05,
    setNumber: 16,
    cardName: `Lion's Threat Imperial Earth Bind`,
    cardType: CardType.EVENT,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.GoldenLionPirates ],
    cost: 3,
    effectText: `[Main] DON!! -2 (You may return the specified number of DON!! cards from your field to your DON!! deck.): K.O. up to 1 of your opponent's Characters with a cost of 5 or less.`,
    triggerText: `[Trigger] Add up to 1 DON!! card from your DON!! deck and set it as active.`,
  },{
    setId: SetId.ST05,
    setNumber: 17,
    cardName: `Union Armada`,
    cardType: CardType.EVENT,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 1,
    types: [ TypeTags.FILM, TypeTags.ThePiratesFest ],
    cost: 2,
    effectText: `[Counter] Up to 1 of your {FILM} type Leader or Character cards gains +4000 power during this battle. If that card is a Character, that Character cannot be K.O.'d during this turn.`,
    triggerText: `[Trigger] Add up to 1 DON!! card from your DON!! deck and set it as active.`,
  },
]