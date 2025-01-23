import { createSlice } from '@reduxjs/toolkit';
import type { FloorTypeDb } from '../../types/floorTypes'; 
// eslint-disable-next-line import/no-cycle
import getFloorTypeThunk from './floorTypeAsyncThunk';

type InitialStateType = {
  floors: FloorTypeDb[];
};

const initialState: InitialStateType = {
  floors: [],
};

export const floorSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFloorTypeThunk.fulfilled, (state, { payload }) => {
      state.floors = payload;
    });
 },
});

export default floorSlice.reducer;
