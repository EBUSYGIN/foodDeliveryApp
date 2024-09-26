import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoginForm } from '../interfaces/LoginForm.interface';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../interfaces/LoginRespose';
import { RootState } from './store';
import { Profile } from '../interfaces/Profile.interface';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { getItem, JWT_KEY } from '../helpers/localStorage';

interface userState {
  jwt: string | null;
  loginState?: string;
  registerState?: string;
  profile?: Profile;
}

const initialState: userState = {
  jwt: getItem(JWT_KEY) || null
};

export const login = createAsyncThunk(
  'user/login',
  async function login(params: LoginForm) {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: params.email,
          password: params.password
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (params: RegisterForm) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeJwt(state) {
      state.jwt = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginState = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload?.access_token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerState = action.error.message;
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
