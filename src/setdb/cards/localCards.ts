import { DbCard } from "setdb/constants";

import { cardList as pCardList} from "./p";
import { cardList as op01cardList } from "./op01";
import { cardList as op02cardList } from "./op02";
import { cardList as st01cardList } from "./st01";
import { cardList as st02cardList } from "./st02";
import { cardList as st03cardList } from "./st03";
import { cardList as st04cardList } from "./st04";
import { cardList as st05cardList } from "./st05";
import { cardList as st06cardList } from "./st06";

const localCards: {[setId: string]: DbCard[]} = {
  'P': pCardList,
  'OP01': op01cardList,
  'OP02': op02cardList,
  'ST01': st01cardList,
  'ST02': st02cardList,
  'ST03': st03cardList,
  'ST04': st04cardList,
  'ST05': st05cardList,
  'ST06': st06cardList,
}

export default localCards;