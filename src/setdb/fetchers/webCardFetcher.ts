import { DbCard } from "setdb/constants";
import CardFetcher from "./cardFetcher";

//// TODO ////
// data https://en.onepiece-cardgame.com/cardlist/   
//    to indicate set append ?series=569101 <= some set id
// images https://www.bandai-tcg-plus.com/card?game_title_id=4&limit=20&offset=0
//    check for s3 links in xhr responses from "list"
//    e.x. https://s3.amazonaws.com/prod.bandaitcgplus.files.api/card_image/OP-EN/OP01/OP01-001_dummy.png
//    public s3 bucket with card face images

class WebCardFetcher extends CardFetcher {
  doFetchCardBatch(): Promise<DbCard[]> {
    return new Promise((resolve, reject) => {
      reject('Fetcher not yet implemented');
    })
  }
}

export default WebCardFetcher;