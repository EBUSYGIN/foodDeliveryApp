import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../interfaces/product.interface';

export interface Cart {
  products: CartItem[];
}

const initialState: Cart = {
  products: []
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
      state.products.map((product) => {
        if (product.id === action.payload) {
          if (product.count === 1) {
            state.products = state.products.filter(
              (i) => i.id !== action.payload
            );
          } else {
            product.count--;
          }
        }
      });
    }
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
