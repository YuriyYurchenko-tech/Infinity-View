import { createAsyncThunk } from '@reduxjs/toolkit';
import appartmentService from '../../services/appartmentService';
import type { AppartmentTypeDb, AppartmentTypeForm } from '../../types/appartmentTypes';

export const getAppartmentThunk = createAsyncThunk<AppartmentTypeDb[]>(
  'appartments/getAll',
  async () => {
    const dataArr = await appartmentService.getAppartments();

    return dataArr;
  },
);

export const addAppartmentThunk = createAsyncThunk<AppartmentTypeDb, FormData>(
  'appartments/addAppartment',
  async (data: FormData) => {
    const newAppartment = await appartmentService.addAppartment(data);
    return newAppartment;
  },
);

export const deleteAppartmentThunk = createAsyncThunk<
  AppartmentTypeDb['id'],
  AppartmentTypeDb['id']
>('appartments/delete', async (id) => {
  await appartmentService.deleteAppartment(id);
  return id;
});

export const updateAppartmentThunk = createAsyncThunk<
  AppartmentTypeDb,
  { id: AppartmentTypeDb['id']; dataForm: AppartmentTypeForm }
>('appartments/update', async ({ id, dataForm }) => {
  const updateAppartment = await appartmentService.updateAppartment(id, dataForm);
  return updateAppartment;
});
export const updateAppartmentStatusThunk = createAsyncThunk<
  AppartmentTypeDb,
  { id: AppartmentTypeDb['id']; reservation: AppartmentTypeDb['reservation'] }
>('appartments/updateStatus', async ({ id, reservation }) => {
  const updateAppartment = await appartmentService.updateAppartmentStatus(id, reservation);
  return updateAppartment;
});

export const getAppartmentByIdThunk = createAsyncThunk(
  'appartments/getAppartmentById',
  async (id: AppartmentTypeDb['id']) => {
    const result = await appartmentService.getAppartmentbookById(id);
    return result;
  },
);
export const updateAllPricesThunk = createAsyncThunk<
  AppartmentTypeDb[],
  { newPrice: number }
>('appartments/updateAllPrices', async ({ newPrice }) => {
  const updatedAppartments = await appartmentService.updatePrices(newPrice);
  return updatedAppartments;
});