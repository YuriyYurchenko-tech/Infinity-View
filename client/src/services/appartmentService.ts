import type { AxiosInstance, AxiosResponse } from 'axios';
import { ZodError } from 'zod';
import type { AppartmentTypeDb, AppartmentTypeForm } from '../types/appartmentTypes';
import { AppartmentSchema } from '../utils/validators';
// eslint-disable-next-line import/no-cycle
import axiosInstance from './axiosInstance';

class ApparmentService {
  constructor(private readonly client: AxiosInstance) {}

  async getAppartments(): Promise<AppartmentTypeDb[]> {
    try {
      const { data } = await this.client<AppartmentTypeDb[]>('/appartments');
      return AppartmentSchema.array().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching posts'));
    }
  }

  async addAppartment(appartment: FormData): Promise<AppartmentTypeDb> {
    const { data } = await this.client.post<AppartmentTypeDb>('/appartments', appartment);
    return AppartmentSchema.parse(data);
  }

  async deleteAppartment(id: AppartmentTypeDb['id']): Promise<AxiosResponse> {
    return this.client.delete<AxiosResponse>(`/appartments/${id}`);
  }

  async updateAppartment(
    id: AppartmentTypeDb['id'],
    appartment: AppartmentTypeForm,
  ): Promise<AppartmentTypeDb> {
    const { data } = await this.client.put<AppartmentTypeDb>(`/appartments/${id}`, appartment);
    return AppartmentSchema.parse(data);
  }

  async updateAppartmentStatus(
    id: AppartmentTypeDb['id'],
    appartment: AppartmentTypeDb['reservation'],
  ): Promise<AppartmentTypeDb> {
    const { data } = await this.client.put<AppartmentTypeDb>(`/appartments/${id}`, appartment);
    return AppartmentSchema.parse(data);
  }

  async getAppartmentbookById(id: AppartmentTypeDb['id']): Promise<AppartmentTypeDb> {
    try {
      const { data } = await this.client<AppartmentTypeDb>(`/appartments/${id}`);
      return AppartmentSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching appartments'));
    }
  }

  async updatePrices(price: number): Promise<AppartmentTypeDb[]> {
    const { data } = await this.client.patch<AppartmentTypeDb[]>('/appartments', {
      price,
    });
    return AppartmentSchema.array().parse(data);
  }
}
export default new ApparmentService(axiosInstance);
``