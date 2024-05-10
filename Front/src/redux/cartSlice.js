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
      const { id, talle } = action.payload;
      const indexToRemove = state.cart.findIndex(
        (item) => item.id === id && item.talle === talle
      );
      if (indexToRemove !== -1) {
        state.cart.splice(indexToRemove, 1);
      }
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
