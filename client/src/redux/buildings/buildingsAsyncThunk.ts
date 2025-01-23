import { createAsyncThunk } from '@reduxjs/toolkit';
import buildingService from '../../services/buildingService';
import type { BuildingType } from '../../types/buildingTypes';

export const getBuildingsThunk = createAsyncThunk<BuildingType[]>(
  'buildings/getAllBuildings',
  async () => {
    const dataArr = await buildingService.getAllBuldings();
    return dataArr;
  },
);
export const getBuildingtByIdThunk = createAsyncThunk(
  'buildings/getBuildingtById',
  async (id: BuildingType['id']) => {
    const one = await buildingService.getBuildingtById(id);
    return one;
  },
);
