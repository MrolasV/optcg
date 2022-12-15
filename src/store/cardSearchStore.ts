import { createSlice } from '@reduxjs/toolkit';
import { MapReducerPayloads } from './util';

export interface ICardSearchState {
  filterExpanded: boolean;
}

type ICardSearchActions = MapReducerPayloads<ICardSearchState, {
  toggleFilterExpanded: {},
}>

const initialState: ICardSearchState = {
  filterExpanded: false,
}

const cardSearchSlice = createSlice<ICardSearchState, ICardSearchActions>({
  name: 'cardSearch',
  initialState,
  reducers: {
    toggleFilterExpanded(state, action) {
      state.filterExpanded = !state.filterExpanded;
    },
  }
});

export const { toggleFilterExpanded } = cardSearchSlice.actions;
export default cardSearchSlice.reducer;

