import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== product.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const getCart = (state) => state.cart.cart;
export const { addToCart, removeFromCart, clearCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
