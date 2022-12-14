import {
  DbCard,
  SetId,
  CardType,
  CardColor,
  CardRarity,
  ArtVariant,
  CardAttribute
} from "setdb/constants";

export const cardList: DbCard[] = [
  {
    setId: SetId.OP01,
    setNumber: 1,
    cardName: 'Roronoa Zoro',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.LEADER,
    artVariants: [ ArtVariant.PARALLEL ],
    blockIcon: 1,
    types: [ 'Supernovas', 'Straw Hat Crew' ],
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: '[DON!!x1] [Your Turn] All of your Characters gain +1000 power.',
    life: 5,
  },{
    setId: SetId.OP01,
    setNumber: 2,
    cardName: 'Trafalgar Law',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED, CardColor.GREEN ],
    rarity: CardRarity.LEADER,
    artVariants: [ ArtVariant.PARALLEL ],
    blockIcon: 1,
    types: [ 'Supernovas', 'Heart Pirates' ],
    power: 5000,
    attribute: CardAttribute.SLASH,
    effectText: '[Activate: Main] [Once Per Turn] ➁ (You may rest the specified number of DON!! cards in your cost area.): If you have 5 Characters, return 1 of your Characters to your hand. Then, play up to 1 Character with a cost of 5 or less from your hand that is a different color than the returned Character.',
    life: 4,
  },{
    setId: SetId.OP01,
    setNumber: 3,
    cardName: 'Monkey.D.Luffy',
    cardType: CardType.LEADER,
    cardColors: [ CardColor.RED, CardColor.GREEN ],
    rarity: CardRarity.LEADER,
    artVariants: [ ArtVariant.PARALLEL ],
    blockIcon: 1,
    types: [ 'Supernovas', 'Straw Hat Crew' ],
    power: 5000,
    attribute: CardAttribute.STRIKE,
    effectText: '[Activate: Main] [Once Per Turn] ➃ (You may rest the specified number of DON!! cards in your cost area.): Set up to 1 of your {Supernovas} or {Straw Hat Crew} type Character cards with a cost of 5 or less as active. It gains +1000 power during this turn.',
    life: 4,
  },{
    setId: SetId.OP01,
    setNumber: 4,
    cardName: 'Usopp',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.RARE,
    blockIcon: 1,
    types: [ 'Straw Hat Crew' ],
    cost: 2,
    power: 3000,
    attribute: CardAttribute.RANGED,
    counter: 2000,
    effectText: '[DON!! x1] [Your Turn] [Once Per Turn] Draw 1 card when your opponent activates an Event.',
  },{
    setId: SetId.OP01,
    setNumber: 5,
    cardName: 'Uta',
    cardType: CardType.CHARACTER,
    cardColors: [ CardColor.RED ],
    rarity: CardRarity.RARE,
    blockIcon: 1,
    types: [ 'FILM' ],
    cost: 4,
    power: 4000,
    attribute: CardAttribute.SPECIAL,
    effectText: '[On Play] Add up to 1 red Character card other than [Uta] with a cost of 3 or less from your trash to your hand.',
  },
];