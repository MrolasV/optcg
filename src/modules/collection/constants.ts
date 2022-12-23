import { CollectionCard } from "setdb/constants";

export interface Collection {
  name: string;
  inventory: CollectionInventory;
}

export type CollectionInventory = CollectionInventoryItem[];
export interface CollectionInventoryItem {
  card: CollectionCard;
  quantity: number;
}