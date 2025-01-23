import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


type AppartmentFiltersState = {
  priceRange: [number, number];
  areaRange: [number, number];
  floor: [number, number];
  roomsQuantity: number | null;
}

const initialState: AppartmentFiltersState = {
  priceRange: [0, 40000000],
  areaRange: [30, 140],
  floor: [1, 17],
  roomsQuantity: null,
};

const appartmentFiltersSlice = createSlice({
  name: 'appartmentFilters',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setAreaRange: (state, action: PayloadAction<[number, number]>) => {
      state.areaRange = action.payload;
    },
    setFloor: (state, action: PayloadAction<[number, number]>) => {
      state.floor = action.payload;
    },
    setRooms: (state, action: PayloadAction<number | null>) => {
      state.roomsQuantity = action.payload;
    },
    resetAppartmentFilters(state) {
      state.roomsQuantity = null; 
      state.priceRange = [0, 40000000];
      state.areaRange = [30,140];
      state.floor = [1, 17]
    }

  },
});

export const { setPriceRange, setAreaRange, setFloor, setRooms, resetAppartmentFilters } = appartmentFiltersSlice.actions;
export default appartmentFiltersSlice.reducer;
