import type React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  addAppartmentThunk,
  deleteAppartmentThunk,
  getAppartmentThunk,
  updateAllPricesThunk,
} from '../redux/appartment/appartmentAsyncThunk';
import type { AppartmentTypeDb, AppartmentTypeForm } from '../types/appartmentTypes';

type UseAppartmentTypes = {
  appartments: AppartmentTypeDb[];
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: AppartmentTypeDb['id']) => void;
  updateAllPricesHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function useAppatments(): UseAppartmentTypes {
  const appartments = useAppSelector((store) => store.appartments.appartments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAppartmentThunk());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataForm = Object.fromEntries(formData.entries()) as { [k: string]: FormDataEntryValue };

    const typedDataForm: AppartmentTypeForm = {
      img: dataForm.img as string,
      square: parseFloat(dataForm.square as string),
      floor: parseInt(dataForm.floor as string, 10),
      roomsQuantity: parseInt(dataForm.roomsQuantity as string, 10),
      buildingId: parseInt(dataForm.buildingId as string, 10),
      deadline: dataForm.deadline as string,
      price: parseFloat(dataForm.price as string),
      reservation: false,
    };

    if (
      !typedDataForm.square ||
      !typedDataForm.img ||
      !typedDataForm.floor ||
      !typedDataForm.roomsQuantity ||
      !typedDataForm.buildingId ||
      !typedDataForm.deadline ||
      !typedDataForm.price
    ) {
      alert('Не все поля заполнены');
      return;
    }

    if (typedDataForm.buildingId > 8 || typedDataForm.buildingId < 2) {
      alert('Корпуса с таким id не существует');
      return;
    }
    
    const dataForApiFile = new FormData();
    dataForApiFile.append('square', typedDataForm.square.toString());
    dataForApiFile.append('file', dataForm.img as File);
    dataForApiFile.append('floor', typedDataForm.floor.toString());
    dataForApiFile.append('roomsQuantity', typedDataForm.roomsQuantity.toString());
    dataForApiFile.append('buildingId', typedDataForm.buildingId.toString());
    dataForApiFile.append('deadline', typedDataForm.deadline);
    dataForApiFile.append('price', typedDataForm.price.toString());

    await dispatch(addAppartmentThunk(dataForApiFile));
  };
  const deleteHandler = (id: AppartmentTypeDb['id']): void => {
    void dispatch(deleteAppartmentThunk(id));
  };

  const updateAllPricesHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newPrice = (e.currentTarget.elements.namedItem('newPrice') as HTMLInputElement)?.value;

    if (!newPrice) {
      alert('Введите новую цену');
      return;
    }

    await dispatch(updateAllPricesThunk({ newPrice: parseFloat(newPrice) }));
    e.currentTarget.reset();
  };

  return { appartments, submitHandler, deleteHandler, updateAllPricesHandler };
}
