import type React from 'react';
import { useAppDispatch } from './hooks';
import { loginThunk } from '../redux/auth/authAsyncThunk';
import type { AdminLoginType } from '../types/userTypes';

type UseAuthProps = {
  loginHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  
};

export default function useAuth(): UseAuthProps {
  const dispatch = useAppDispatch();
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as AdminLoginType;
    if (!data.email || !data.password) {
      return alert("Отсутствуют обязательные поля!")
    }
    void dispatch(loginThunk(data));
    e.currentTarget.reset()
  };
  return {
    
    loginHandler,
    
  };
}
