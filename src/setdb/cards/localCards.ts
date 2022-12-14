import { DbCard } from "setdb/constants";

import { cardList as op01cardList } from "./op01";
import { cardList as st01cardList } from "./st01";

const localCards: {[setId: string]: DbCard[]} = {
  'OP01': op01cardList,
  'ST01': st01cardList,
}

export default localCards;