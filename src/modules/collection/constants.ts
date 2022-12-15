import { DbCard } from "setdb/constants";

export interface Collection {
  name: string;
  cards: {
    card: DbCard,
    quantity: number,
  }[]
}