import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import buildingReducer from './buildings/buildingsSlice';
import appartmentReducer from './appartment/appartmentSlice';
import apartmentFiltersReducer from './appartment/appartmentFiltersSlice';
import floorTypeFiltersReducer from './floorType/floorTypeFiltersSlice';
import feedbackReducer from './feedback/feedbackSlice';
import floorReducer from './floorType/floorTypeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    building: buildingReducer,
    appartments: appartmentReducer,
    apartmentFilters: apartmentFiltersReducer,
    floorTypeFilters: floorTypeFiltersReducer,
    feedbacks: feedbackReducer,
    floors: floorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
