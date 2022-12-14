import { DbCard } from "setdb/constants";
import CardFetcher from "./cardFetcher";
import localCards from "setdb/cards/localCards";

class LocalCardFetcher extends CardFetcher {
  doFetchCardBatch = (): Promise<DbCard[]> => {
    this.isFetching = true;
    return new Promise((resolve, reject) => {
      this.isFetching = false;
      resolve(Object.values(localCards).flat(1));
    });
  }
}

export default LocalCardFetcher;