import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


type BlockFiltersState = {
  block: string | null;
}

const initialState: BlockFiltersState = {
  block: null,
};

const floorTypeFiltersSlice = createSlice({
  name: 'floorTypeFilters',
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<string | null>) => {
      state.block = action.payload;
    },
    resetFilters(state) {
      state.block = null; 
    }
  },
});

export const { setBlocks, resetFilters } = floorTypeFiltersSlice.actions;
export default floorTypeFiltersSlice.reducer;
