import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPorductQuantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      console.log("existingItem ", existingItem);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          quantity: 1,
          size: action.payload.size,
        });
        state.totalPorductQuantity += 1;
      }
    },
    deleteProductToCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      state.totalPorductQuantity -= 1;
    },
    resetCart: (state) => {
        state.items=[];
        state.totalPorductQuantity=0;
    },
  },
});

export const { addProductToCart,deleteProductToCart } = cartSlice.actions;
export default cartSlice.reducer;
