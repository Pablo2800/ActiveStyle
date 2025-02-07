import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartID: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => {
        return item.id !== id;
      });
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCart: (state, action) => {
      const { id, talle } = action.payload;
      const productIndex = state.cart.findIndex(
        (item) => item.id === id && item.talle === talle
      );

      if (productIndex !== -1) {
        if (state.cart[productIndex].cantidad > 1) {
          state.cart[productIndex].cantidad -= 1; // Decrementa la cantidad.
        } else {
          state.cart.splice(productIndex, 1); // Elimina el producto si la cantidad llega a 0.
        }
      }
    },
    setCartID: (state, action) => {
      state.cartID = action.payload;
    },
  },
});

export const getCart = (state) => state.cart.cart;
export const getCartID = (state) => state.cart.cartID;
export const { addToCart, removeFromCart, clearCart, updateCart, setCartID } =
  cartSlice.actions;

export default cartSlice.reducer;
