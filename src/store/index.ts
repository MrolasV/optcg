import { configureStore } from '@reduxjs/toolkit';
import databaseReducer, { IDatabaseState } from './databaseStore';
import cardSearchReducer, { ICardSearchState } from './cardSearchStore';

export interface IHomeState {
  database: IDatabaseState;
  cardSearch: ICardSearchState;
}

export const store = configureStore<IHomeState>({
  reducer: {
    database: databaseReducer,
    cardSearch: cardSearchReducer,
  }
});