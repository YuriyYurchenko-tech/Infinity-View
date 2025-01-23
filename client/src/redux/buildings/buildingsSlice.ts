import { createSlice } from '@reduxjs/toolkit';
import type { BuildingType } from '../../types/buildingTypes';
// eslint-disable-next-line import/no-cycle
import { getBuildingsThunk, getBuildingtByIdThunk } from './buildingsAsyncThunk';

type InitialStateType = {
  buildings: BuildingType[];
  oneBuilding: BuildingType | null;
  currentBuilding: BuildingType | null,
  chosenBuilding: BuildingType | null,
};

const initialState: InitialStateType = {
  buildings: [],
  oneBuilding: null,
  currentBuilding: null,
  chosenBuilding: null,
};

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    setChosenBuilding: (state, { payload }: { payload: BuildingType | null }) => {
      state.currentBuilding = payload;
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBuildingsThunk.fulfilled, (state, { payload }) => {
      state.buildings = payload;
    });
    builder.addCase(getBuildingtByIdThunk.fulfilled, (state, { payload }) => {
      state.oneBuilding = payload;
    });
  },
});

export const {setChosenBuilding} = buildingSlice.actions
export default buildingSlice.reducer;
