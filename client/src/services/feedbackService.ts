import type { AxiosInstance, AxiosResponse } from 'axios';
import { ZodError } from 'zod';
import type { FeedbackTypeDb, FeedbackTypeForm } from '../types/feedbackTypes';
import { FeedbackSchema } from '../utils/validators';
import axiosInstance from './axiosInstance';

class FeedbackService {
  constructor(private readonly client: AxiosInstance) {}

  async getFeedbacks(): Promise<FeedbackTypeDb[]> {
    try {
      const { data } = await this.client<FeedbackTypeDb[]>('/feedbacks');
      return FeedbackSchema.array().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching posts'));
    }
  }

  async addFeedback(feedback: FeedbackTypeForm): Promise<FeedbackTypeDb> {
    const { data } = await this.client.post<FeedbackTypeDb>('/feedbacks', feedback);
    return FeedbackSchema.parse(data);
  }

  async deleteFeedback(id: FeedbackTypeDb['id']): Promise<AxiosResponse> {
    return this.client.delete<AxiosResponse>(`/feedbacks/${id}`);
  }

  async updateFeedback(
    id: FeedbackTypeDb['id'],
    feedback: FeedbackTypeForm,
  ): Promise<FeedbackTypeDb> {
    const { data } = await this.client.put<FeedbackTypeDb>(`/feedbacks/${id}`, feedback);

    return FeedbackSchema.parse(data);
  }

  async geteedbackById(id: FeedbackTypeDb['id']): Promise<FeedbackTypeDb> {
    try {
      const { data } = await this.client<FeedbackTypeDb>(`/feedbacks/${id}`);
      return FeedbackSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZodError issues:', error.issues);
      } else {
        console.log(error);
      }
      return Promise.reject(new Error('Error fetching appartments'));
    }
  }
}

export default new FeedbackService(axiosInstance);
