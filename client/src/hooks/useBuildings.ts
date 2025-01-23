import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import type { BuildingType } from '../types/buildingTypes';
import { getBuildingsThunk } from '../redux/buildings/buildingsAsyncThunk';

type UseBuildingsTypes = {
  buildings: BuildingType[];
};

export default function useBuidlings(): UseBuildingsTypes {
  const buildings = useAppSelector((store) => store.building.buildings);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getBuildingsThunk());
  }, []);

  return { buildings };
}
