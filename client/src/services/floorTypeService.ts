import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import type { FloorTypeDb } from '../types/floorTypes'; 
import { FloorTypeSchema } from '../utils/validators';
import axiosInstance from './axiosInstance';

class FloorTypeService {
  constructor(private readonly client: AxiosInstance) {}

  async getFloorTypes(): Promise<FloorTypeDb[]> {
    try {
      const { data } = await this.client<FloorTypeDb[]>('/floorTypes');
      return FloorTypeSchema.array().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching posts'));
    }
  }
}
export default new FloorTypeService(axiosInstance);
