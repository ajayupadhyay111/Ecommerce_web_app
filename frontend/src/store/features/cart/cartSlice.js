import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProduct: {},
  cartProductQuantity: 0,
  totalProductsPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductsToCart: (state, action) => {
      const { cartData } = action.payload;
      state.cartProduct = cartData;
    },
    totalProductsPrice: (state, action) => {
      const { totalPrice } = action.payload;
      state.totalProductsPrice = totalPrice;
    },
    totalProductQuantityInCart: (state, action) => {
      state.cartProductQuantity = action.payload.cartProductQuantity;
    },
    resetCart: (state) => {
      state.cartProduct = {};
    },
  },
});

export const {
  addProductsToCart,
  totalProductsPrice,
  totalProductQuantityInCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
