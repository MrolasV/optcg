import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
// https://github.com/reduxjs/redux-toolkit/issues/2274
export type MapReducerPayloads<State, ReducerPayloadMap> = {
  [K in keyof ReducerPayloadMap]: CaseReducer<State, PayloadAction<ReducerPayloadMap[K]>>
}