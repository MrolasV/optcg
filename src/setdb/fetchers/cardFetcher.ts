import { DbCard } from "setdb/constants";

abstract class CardFetcher {
  isFetching: boolean;
  nextToken?: string;

  constructor () {
    this.isFetching = false;
  }

  hasNextToken = ():boolean => {
    return !!this.nextToken;
  }

  fetchCardBatch = (): Promise<DbCard[]> => {
    if (this.isFetching) {
      return new Promise((resolve, reject) => {
        reject('Fetch in progress');
      })
    } else {
      return this.doFetchCardBatch();
    }
  }

  abstract doFetchCardBatch(): Promise<DbCard[]>;
}

export default CardFetcher;