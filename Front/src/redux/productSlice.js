import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  newProducts: [],
  productsByCategory: [],
  allTalles: [37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 43, 44, 45],
  selectProduct: 0,
  tallesCopiaOriginal: [],
  cantidadSelect: 1,
  filteredProductsByCategory: [],
  filteredProductsByDiscount: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
      state.tallesCopiaOriginal = [...state.filteredProducts.talles];
    },
    setProductsByCategory: (state, action) => {
      state.productsByCategory = action.payload;
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setSelectProduct: (state, action) => {
      state.selectProduct = action.payload;
    },
    updateProductTalles: (state, action) => {
      const { talles } = action.payload;
      state.filteredProducts = {
        ...state.filteredProducts,
        talles: [...talles],
      };
    },
    resetProductTalles: (state) => {
      state.filteredProducts = {
        ...state.filteredProducts,
        talles: state.tallesCopiaOriginal,
      };
    },
    setCantidadSelect: (state, action) => {
      state.cantidadSelect = action.payload;
    },
    setFilteredProductsByCategory: (state, action) => {
      state.filteredProductsByCategory = action.payload;
    },
    setFilteredProductsByDiscount: (state, action) => {
      state.filteredProductsByDiscount = action.payload;
    },
  },
});

export const getAllProducts = (state) => state.products.allProducts;
export const getFilteredProducts = (state) => state.products.filteredProducts;
export const getNewProducts = (state) => state.products.newProducts;
export const getAllTallesCalzado = (state) => state.products.allTalles;
export const getAllTallesIndumentaria = (state) =>
  state.products.allTallesIndumentaria;
export const getSelectProduct = (state) => state.products.selectProduct;
export const getCantidadSelect = (state) => state.products.cantidadSelect;
export const getProductsByCategory = (state) =>
  state.products.productsByCategory;
export const getFilteredProductsByCategory = (state) =>
  state.products.filteredProductsByCategory;
export const getFilteredProductsByDiscount = (state) =>
  state.products.filteredProductsByDiscount;
export const {
  setAllProducts,
  setFilteredProducts,
  setNewProducts,
  setSelectProduct,
  updateProductTalles,
  resetProductTalles,
  setCantidadSelect,
  setProductsByCategory,
  setFilteredProductsByCategory,
  setFilteredProductsByDiscount,
} = productsSlice.actions;

export default productsSlice.reducer;
