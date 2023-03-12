import { CollectionCard, EffectTag } from "setdb/constants";

export interface Collection {
  name: string;
  inventory: CollectionInventory;
}

export type CollectionInventory = CollectionInventoryItem[];
export interface CollectionInventoryItem {
  card: CollectionCard;
  quantity: number;
}

export const filterEffectTagsSearchTerms: Map<EffectTag, RegExp> = new Map<EffectTag, RegExp>([
  // Condition
  [EffectTag.DON_ATTACH, /\[DON!! x\d+\]/i],
  [EffectTag.ONCE_PER_TURN, /\[Once Per Turn\]/i],
  [EffectTag.YOUR_TURN, /\[Your Turn\]/i],
  [EffectTag.OPPONENTS_TURN, /\[Opponent's Turn\]/i],

  // Trigger
  [EffectTag.ACTIVATE_MAIN, /\[Activate: Main\]/i],
  [EffectTag.END_OF_TURN, /\[End of Turn\]/i],
  [EffectTag.ON_PLAY, /\[On Play\]/i],
  [EffectTag.WHEN_ATTACKING, /\[When Attacking\]/i],
  [EffectTag.ON_BLOCK, /\[On Block\]/i],
  [EffectTag.EVENT_MAIN, /\[Main\]/i],
  [EffectTag.EVENT_COUNTER, /\[Counter\]/i],

  // Cost
  [EffectTag.DON_MINUS, /\(You may return the specified number of DON!! cards from your field to your DON!! deck\.\)/i], // DON!! -1
  [EffectTag.DON_ACTIVATE, /\(You may rest the specified number of DON!! cards in your cost area\.\)/i], // ➀

  // Effect
  [EffectTag.BLOCKER, /\(After your opponent declares an attack, you may rest this card to make it the new target of the attack\.\)/i],
  [EffectTag.RUSH, /\(This card can attack on the turn in which it is played\.\)/i],
  [EffectTag.BANISH, /\(When this card deals damage, the target card is trashed without activating its Trigger\.\)/i],
  [EffectTag.DOUBLE_ATTACK, /\(This card deals 2 damage\.\)/i],
  [EffectTag.REDUCE_COST, /-\d+ cost/i],
]);