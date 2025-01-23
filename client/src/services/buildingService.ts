import { ZodError } from 'zod';
import type { AxiosInstance } from 'axios';
import type { BuildingType } from '../types/buildingTypes';
import { BuildingShema, AppartmentSchema } from '../utils/validators';
import axiosInstance from './axiosInstance';
import type { AppartmentTypeDb } from '../types/appartmentTypes';

class BuildingServices {
  constructor(private readonly client: AxiosInstance) {}

  async getAllBuldings(): Promise<BuildingType[]> {
    const { data } = await this.client<BuildingType[]>('/buildings');
    return BuildingShema.array().parse(data);
  }

  async getBuildingtById(id: BuildingType['id']): Promise<BuildingType> {
    try {
      const { data } = await this.client<BuildingType>(`/buildings/${id}`);
      return BuildingShema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching posts'));
    }
  }

  async updateAppartmentsPrices(buildingId: BuildingType['id'], newPrice: number): Promise<AppartmentTypeDb[]> {
    try {
      const { data } = await this.client.patch<AppartmentTypeDb[]>(`/buildings/${buildingId}/appartments`, { price: newPrice });
      return AppartmentSchema.array().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error updating apartment prices'));
    }
  }
}

export default new BuildingServices(axiosInstance);
