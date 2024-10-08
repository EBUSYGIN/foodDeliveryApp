import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../interfaces/product.interface';
import { CART_KEY, getItem } from '../helpers/localStorage';

export interface Cart {
  products: CartItem[];
}

const initialState: Cart = {
  products: getItem(CART_KEY) || []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<number>) => {
      const existed = state.products.find((i) => i.id === action.payload);
      if (existed) {
        existed.count++;
      } else {
        state.products.push({ id: action.payload, count: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((i) => i.id !== action.payload);
    },
    decreaseProduct: (state, action: PayloadAction<number>) => {
      const existed = state.products.find((i) => i.id === action.payload);
      if (!existed) return;
      if (existed.count === 1) {
        state.products = state.products.filter((i) => i.id !== action.payload);
      } else {
        existed.count--;
      }
    }
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
