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
      if (!existed) {
        state.products.push({ id: action.payload, count: 1 });
        return;
      }
      state.products.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    }
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
