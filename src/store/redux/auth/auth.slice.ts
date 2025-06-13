import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/models/user';

type AuthState = {
  user: User | null;
  token: string | null;
};

const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');

      state.token = null;
      localStorage.removeItem('token');
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        // Update only the provided fields
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        
        // Update in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
