import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import type { AuthResponse, User } from '../../types/auth';

interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: { name: '', email: '' },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
};

const setAuthData = (state: AuthState, { payload }: PayloadAction<AuthResponse>) => {
  state.user = { name: payload.name, email: payload.email };
  state.token = payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, setAuthData)
      .addCase(login.fulfilled, setAuthData)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = { name: payload.name, email: payload.email };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, () => initialState)
      .addMatcher(isAnyOf(register.pending, login.pending, logout.pending), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.rejected, login.rejected), state => {
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;