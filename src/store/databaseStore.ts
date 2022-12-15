import { createSlice } from '@reduxjs/toolkit';
import { DbCard } from 'setdb/constants';
import { MapReducerPayloads } from './util';

export interface IDatabaseState {
  loading: boolean;
  data: {[setId: string]: DbCard[]};
}

type IDatabaseActions = MapReducerPayloads<IDatabaseState, {
  addToDatabase: {
    cards: DbCard[],
  },
  setDatabaseLoading: boolean,
}>

const initialState: IDatabaseState = {
  loading: false,
  data: {}
}

const databaseSlice = createSlice<IDatabaseState, IDatabaseActions>({
  name: 'database',
  initialState,
  reducers: {
    addToDatabase(state, action) {
      const cardDataArr: DbCard[] = action.payload.cards;
      cardDataArr.forEach(cardData => {
        const setId = cardData.setId;
        if (!state.data[setId]) {
          state.data[setId] = [];
        }
        state.data[setId][cardData.setNumber] = cardData;
      });
    },
    setDatabaseLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { addToDatabase, setDatabaseLoading } = databaseSlice.actions;
export default databaseSlice.reducer;

