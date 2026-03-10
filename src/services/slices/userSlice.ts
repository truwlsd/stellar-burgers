import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  getUserApi,
  registerUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const checkAuth = createAsyncThunk('user/check', async () => {
  const res = await getUserApi();
  return res.user;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null as TUser | null,
    isAuthChecked: false, // Флаг: проверили мы токены или нет
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.isAuthChecked = true;
      })
      // Register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export default userSlice.reducer;
