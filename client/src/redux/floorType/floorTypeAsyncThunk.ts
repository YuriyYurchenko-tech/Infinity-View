import { createAsyncThunk } from '@reduxjs/toolkit';
import floorTypeService from '../../services/floorTypeService';
import type { FloorTypeDb } from '../../types/floorTypes'; 

 const getFloorTypeThunk = createAsyncThunk<FloorTypeDb[]>(
  'floors/getAllFloors',
  async () => {
    const dataArr = await floorTypeService.getFloorTypes();
    return dataArr;
  },
);
export default getFloorTypeThunk;

