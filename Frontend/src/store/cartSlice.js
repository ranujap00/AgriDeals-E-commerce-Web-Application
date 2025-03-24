// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.item_id === action.payload.item_id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
    },
    removeItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.item_id === action.payload);
      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
