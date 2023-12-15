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
    setId: SetId.ST10,
    setNumber: 1,
    cardName: 'Trafalgar Law',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED, CardColor.PURPLE ],
    rarity: CardRarity.LEADER,
    artists: [ 'Makitoshi' ],
    blockIcon: 2,
    types: [ TypeTags.HeartPirates ],
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: `[Activate: Main] [Once Per Turn] DON!! -3 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Place up to 1 of your opponent's Characters with 3000 power or less at the bottom of the owner's deck, and play up to 1 Character card with a cost of 4 or less from your hand.`,
    life: 4,
  },{
    setId: SetId.ST10,
    setNumber: 2,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED, CardColor.PURPLE ],
    rarity: CardRarity.LEADER,
    artists: [ 'Makitoshi' ],
    blockIcon: 2,
    types: [ TypeTags.StrawHatCrew ],
    power: 6000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Activate: Main] [Once Per Turn] If you have 0 DON!! cards on your field or 8 or more DON!! cards on your field, add up to 1 DON!! card from your DON!! deck and set it as active.`,
    life: 3,
  },{
    setId: SetId.ST10,
    setNumber: 3,
    cardName: 'Eustass"Captain"Kid',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED, CardColor.PURPLE ],
    rarity: CardRarity.LEADER,
    artists: [ 'Makitoshi' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    power: 5000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[Your Turn] If you have 4 or more Life cards, give this Leader -1000 power.
    [When Attacking] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): This Leader gains +2000 power during this turn.`,
    life: 5,
  },{
    setId: SetId.ST10,
    setNumber: 4,
    cardName: 'Sanji',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'S-KINOKO' ],
    blockIcon: 2,
    types: [ TypeTags.StrawHatCrew ],
    cost: 6,
    power: 6000,
    attribute: CardAttribute.STRIKE,
    effectText: `[On Play] If your opponent has a Character with 5000 or more power, this Character gains [Rush] during this turn.
    (This card can attack on the turn in which it is played.)`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 5,
    cardName: 'Jinbe',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'S-KINOKO' ],
    blockIcon: 2,
    types: [ TypeTags.FishMan, TypeTags.StrawHatCrew ],
    cost: 2,
    power: 2000,
    attribute: CardAttribute.STRIKE,
    effectText: `[DON!! x1] [When Attacking] Give up to 1 of your opponent's Characters -2000 power during this turn.`,
    counter: 2000,
  },{
    setId: SetId.ST10,
    setNumber: 6,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'phima' ],
    blockIcon: 2,
    types: [ TypeTags.StrawHatCrew ],
    cost: 10,
    power: 11000,
    attribute: CardAttribute.STRIKE,
    effectText: `[Rush] (This card can attack on the turn in which it is played.)
    [Once Per Turn] When your opponent activates a [Blocker], K.O. up to 1 of your opponent's Characters with 8000 power or less.`,
  },{
    setId: SetId.ST10,
    setNumber: 7,
    cardName: 'Killer',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Studio Vigor Co.,Ltd' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    cost: 5,
    power: 6000,
    attribute: CardAttribute.SLASH,
    effectText: `[Your Turn] [Once Per Turn] When a DON!! card on your field is returned to your DON!! deck, K.O. up to 1 of your opponent's rested Characters with a cost of 3 or less.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 8,
    cardName: 'Shachi & Penguin',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Studio Vigor Co.,Ltd' ],
    blockIcon: 2,
    types: [ TypeTags.HeartPirates ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.RANGED,
    effectText: `[On Play] If you have 3 or less DON!! cards on your field, add up to 2 DON!! cards from your DON!! deck and rest them.`,
    counter: 2000,
  },{
    setId: SetId.ST10,
    setNumber: 9,
    cardName: 'Jean Bart',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'tatsuya' ],
    blockIcon: 2,
    types: [ TypeTags.HeartPirates ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: `[On Play] ➀ (You may rest the specified number of DON!! cards in your cost area.): Add up to 1 DON!! card from your DON!! deck and set it as active.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 10,
    cardName: 'Trafalgar Law',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'Minato Sashima' ],
    blockIcon: 2,
    types: [ TypeTags.HeartPirates ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)
    [On Play] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): If your opponent has 7 or more cards in their hand, trash 2 cards from your opponent's hand.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 11,
    cardName: 'Heat',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'ASAKI KURODA' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    cost: 3,
    power: 4000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[Your Turn] [Once Per Turn] When a DON!! card on your field is returned to your DON!! deck, this Character gains +2000 power until the start of your next turn.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 12,
    cardName: 'Bepo',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'COGA' ],
    blockIcon: 2,
    types: [ TypeTags.Minks, TypeTags.HeartPirates ],
    cost: 4,
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: `[On Play]/[When Attacking] If your opponent has more DON!! cards on their field than you, add up to 1 DON!! card from your DON!! deck and rest it.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 13,
    cardName: 'Eustass"Captain"Kid',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.SUPER_RARE,
    artists: [ 'SENNSU' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    cost: 7,
    power: 8000,
    attribute: CardAttribute.SPECIAL,
    effectText: `[On Play]/[When Attacking] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Up to 1 of your Leader gains +1000 power until the start of your next turn.`,
  },{
    setId: SetId.ST10,
    setNumber: 14,
    cardName: 'Wire',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'ASAKI KURODA' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    cost: 3,
    power: 3000,
    attribute: CardAttribute.SLASH,
    effectText: `[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)
    [Once Per Turn] When a DON!! card on your field is returned to your DON!! deck, draw 1 card and trash 1 card from your hand.`,
    counter: 1000,
  },{
    setId: SetId.ST10,
    setNumber: 15,
    cardName: 'Gum-Gum Giant Sumo Slap',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    blockIcon: 2,
    types: [ TypeTags.StrawHatCrew ],
    cost: 1,
    effectText: `[Counter] Up to 1 of your Leader or Character cards gains +2000 power during this battle, and K.O. up to 1 of your opponent's Characters with 2000 power or less.`,
  },{
    setId: SetId.ST10,
    setNumber: 16,
    cardName: 'Gum-Gum Kong Gatling',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    blockIcon: 2,
    types: [ TypeTags.StrawHatCrew ],
    cost: 5,
    effectText: `[Main] K.O. up to 1 of your opponent's Characters with 7000 power or less.`,
    triggerText: `[Trigger] Up to 1 of your Leader gains +1000 power until the end of your next turn.`,
  },{
    setId: SetId.ST10,
    setNumber: 17,
    cardName: 'Punk Vise',
    cardType: CardType.EVENT,
    cardColors: [ CardColor.PURPLE ],
    rarity: CardRarity.COMMON,
    artists: [ 'Manga' ],
    blockIcon: 2,
    types: [ TypeTags.KidPirates ],
    cost: 3,
    effectText: `[Main] Rest up to 1 of your opponent's Characters with a cost of 2 or less, and add up to 1 DON!! card from your DON!! deck and rest it.`,
    triggerText: `[Trigger] Add up to 1 DON!! card from your DON!! deck and set it as active.`,
  },
];