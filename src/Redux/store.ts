import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import { JWT_KEY, setItem } from '../helpers/localStorage';
import cartSlice from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

store.subscribe(() => {
  setItem(store.getState().user.jwt, JWT_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
