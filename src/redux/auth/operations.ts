import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { api, clearAuthHeader, setAuthHeader } from '../../services/api';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../../types/auth';

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return 'Something went wrong';
};

export const register = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post<AuthResponse>('/users/signup', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post<AuthResponse>('/users/signin', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/users/signout');
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const refreshUser = createAsyncThunk<
  AuthResponse,
  void,
  { state: { auth: { token: string | null } }; rejectValue: string }
>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    setAuthHeader(token as string);
    try {
      const { data } = await api.get<AuthResponse>('/users/current');
      return data;
    } catch (error) {
      clearAuthHeader();
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) => Boolean(getState().auth.token),
  },
);