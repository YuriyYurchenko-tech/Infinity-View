import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import authService from '../../services/authService';
import type { AdminLoginType, AdminState } from '../../types/userTypes';

export const loginThunk = createAsyncThunk<AdminState, AdminLoginType>(
  'auth/login',
  async (userData) => authService.authLogin(userData),
);

export const logoutThunk = createAsyncThunk<AxiosResponse>('auth/logout', async () =>
  authService.authLogout(),
);

export const checkUserThunk = createAsyncThunk<AdminState>(
  'auth/check',
  async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        authService.checkUser().then(resolve).catch(reject);
      }, 1000);
    }),
);
