import { configureStore } from '@reduxjs/toolkit';
import databaseReducer, { IDatabaseState } from './databaseStore';

export interface IHomeState {
  database: IDatabaseState;
}

export const store = configureStore<IHomeState>({
  reducer: {
    database: databaseReducer,
  }
});