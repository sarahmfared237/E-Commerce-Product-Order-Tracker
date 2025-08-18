import api from './index';
import { UserRegisterRequest, UserLoginRequest, AuthResponse } from '../models/auth';

export const register = async (userData: UserRegisterRequest): Promise<any> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: UserLoginRequest): Promise<any> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};