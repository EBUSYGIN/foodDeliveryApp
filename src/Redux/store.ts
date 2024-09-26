import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import cartSlice from './cart.slice';
import { CART_KEY, JWT_KEY, setItem } from '../helpers/localStorage';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

store.subscribe(() => {
  setItem(store.getState().user.jwt, JWT_KEY);
  setItem(store.getState().cart.products, CART_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
