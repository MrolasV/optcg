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
    setId: SetId.ST11,
    setNumber: 1,
    cardName: 'Uta',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.GREEN ],
    rarity: CardRarity.LEADER,
    artists: [ 'Anime' ],
    blockIcon: 2,
    types: [ TypeTags.FILM ],
    power: 5000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[DON!! x1] [When Attacking] [Once Per Turn] Reveal 1 card from the top of your deck and add up to 1 {FILM} type card to your hand. Then, place the rest at the bottom of your deck.`,
    life: 5,
  },{
    setId: SetId.ST11,
    setNumber: 2,
    cardName: 'Uta',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.GREEN ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Sunohara' ],
    blockIcon: 2,
    types: [ TypeTags.FILM ],
    cost: 3,
    power: 4000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)
    [End of Your Turn] You may trash 1 Event from your hand: Set up to 1 of your {FILM} type Characters as active.`,
    counter: 1000,
  },{
    setId: SetId.ST11,
    setNumber: 3,
    cardName: 'Backlight',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.GREEN ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 2,
    types: [ TypeTags.Music, TypeTags.FILM ],
    cost: 2,
    effectText: `[Main] If your Leader is [Uta], choose one:
    • Rest up to 1 of your opponent's Characters with a cost of 5 or less.
    • K.O. up to 1 of your opponent's rested Characters with a cost of 5 or less.`,
  },{
    setId: SetId.ST11,
    setNumber: 4,
    cardName: 'New Genesis',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.GREEN ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Anime' ],
    blockIcon: 2,
    types: [ TypeTags.Music, TypeTags.FILM ],
    cost: 1,
    effectText: `[Main] If your Leader is [Uta], look at 3 cards from the top of your deck; reveal up to 1 {FILM} type card other than [New Genesis] and add it to your hand. Then, place the rest at the bottom of your deck in any order and set up to 1 of your DON!! cards as active.`,
  },{
    setId: SetId.ST11,
    setNumber: 5,
    cardName: `I'm invincible`,
    cardType: CardType.EVENT,
    cardColors: [ CardColor.GREEN ],
    rarity: CardRarity.COMMON,
    artists: [ 'Anime' ],
    blockIcon: 2,
    types: [ TypeTags.Music, TypeTags.FILM ],
    cost: 3,
    effectText: `[Main] Set up to 1 of your [Uta] Leader as active.`,
    triggerText: `[Trigger] Up to 1 of your Leader or Character cards gains +1000 power during this turn.`,
  },
];