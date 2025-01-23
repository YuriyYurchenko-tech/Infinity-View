import { createSlice } from '@reduxjs/toolkit';
import type { AppartmentTypeDb } from '../../types/appartmentTypes';
import { addAppartmentThunk, deleteAppartmentThunk, getAppartmentByIdThunk, getAppartmentThunk, updateAppartmentThunk, updateAllPricesThunk } from './appartmentAsyncThunk';

type InitialStateType = {
  appartments: AppartmentTypeDb[];
  oneAppartment: AppartmentTypeDb | null;
  favoriteAppartments: AppartmentTypeDb[];
  currentAppartment: AppartmentTypeDb | null;
};

const initialState: InitialStateType = {
  appartments: [],
  oneAppartment: null,
  favoriteAppartments: [],
  currentAppartment: null,
};

export const appartmentSlice = createSlice({
  name: 'appartments',
  initialState,
  reducers: {
    setModal: (state, { payload }: { payload: AppartmentTypeDb | null }) => {
      state.currentAppartment = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppartmentThunk.fulfilled, (state, { payload }) => {
      state.appartments = payload;
    });
    builder.addCase(updateAllPricesThunk.fulfilled, (state, { payload }) => {
      state.appartments = payload;
    });
        builder.addCase(addAppartmentThunk.fulfilled, (state, { payload }) => {
      state.appartments.push(payload);
    });
    builder.addCase(deleteAppartmentThunk.fulfilled, (state, { payload }) => {
      const index = state.appartments.findIndex((el) => el.id === payload);
      state.appartments.splice(index, 1);
    });
    builder.addCase(updateAppartmentThunk.fulfilled, (state, { payload }) => {
      const index = state.appartments.findIndex((el) => el.id === payload.id);
      if (index >= 0) state.appartments[index] = payload;
    });
    builder.addCase(getAppartmentByIdThunk.fulfilled, (state, {payload}) => {
      state.oneAppartment = payload;
    });
  },
});

export const { setModal } = appartmentSlice.actions;
export default appartmentSlice.reducer;
