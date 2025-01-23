import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AdminStateType } from '../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk } from './authAsyncThunk';

export type AuthTypes = {
  accessToken: string;
  user: AdminStateType;
};

const initialState: AuthTypes = {
  accessToken: '',
  user: { status: 'pending' },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = {
        ...payload.user,
        status: 'logged',
      } as AdminStateType;
    });

    builder.addCase(checkUserThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = {
        ...payload.user,
        status: 'logged',
      } as AdminStateType; 
    });

  
    builder.addCase(checkUserThunk.rejected, (state) => {
      state.accessToken = '';
      state.user = {
        status: 'guest',
      } as AdminStateType; 
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.accessToken = '';
      state.user = {
        status: 'guest',
      } as AdminStateType;
    });
  },
});

export default authSlice.reducer;
