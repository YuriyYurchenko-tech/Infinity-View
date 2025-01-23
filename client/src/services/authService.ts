import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { AdminLoginType, AdminState } from '../types/userTypes';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async authLogin(userdata: AdminLoginType): Promise<AdminState> {
    const { data } = await this.client.post<AdminState>('/auth/login', userdata);
    return data;
  }

  async authLogout(): Promise<AxiosResponse> {
    return this.client<AxiosResponse>('/auth/logout');
  }

  async checkUser(): Promise<AdminState> {
    const { data } = await this.client<AdminState>('/tokens/refresh');
    return data;
  }
}
export default new AuthService(axiosInstance);
