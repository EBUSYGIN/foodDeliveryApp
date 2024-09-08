import { createSlice } from '@reduxjs/toolkit';
import { getItem, JWT_KEY } from '../helpers/localStorage';

interface userState {
  jwt: string | null;
}

const initialState: userState = {
  jwt: getItem(JWT_KEY) ?? null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addJwt(state, action) {
      state.jwt = action.payload.jwt;
    },
    removeJwt(state) {
      state.jwt = null;
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
