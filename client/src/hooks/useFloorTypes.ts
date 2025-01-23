import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import type { FloorTypeDb } from '../types/floorTypes'; 
import getFloorTypeThunk from '../redux/floorType/floorTypeAsyncThunk';

type UseFloorTypes = {
  floors: FloorTypeDb[];
};

export default function useFloorTypes(): UseFloorTypes {
  const floors = useAppSelector((store) => store.floors.floors);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getFloorTypeThunk());
  }, []);

  return { floors };
}
