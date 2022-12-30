import { DbCard } from "setdb/constants";

import { cardList as pCardList} from "./p";
import { cardList as op01cardList } from "./op01";
import { cardList as st01cardList } from "./st01";
import { cardList as st02cardList } from "./st02";
import { cardList as st03cardList } from "./st03";
import { cardList as st04cardList } from "./st04";

const localCards: {[setId: string]: DbCard[]} = {
  'P': pCardList,
  'OP01': op01cardList,
  'ST01': st01cardList,
  'ST02': st02cardList,
  'ST03': st03cardList,
  'ST04': st04cardList,
}

export default localCards;