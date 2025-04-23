import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProduct:new Map(),
  cartProductQuantity:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state,action)=>{
      const {id,size,quantity} = action.payload;
      if(state.cartProduct.has(`{id,size}`)){
        state.cartProduct[id] += 1;
      }else{
        state.cartProduct[id] = 1;
      }
    },
    increaseProductQuantity:(state,action)=>{
      const {id,size} = action.payload;
      state.cartProduct[id] += 1;
    },
    decreaseProductQuantity:(state,action)=>{
      const {id,size} = action.payload;
      state.cartProduct[id] -= 1;
    },
    totalProductQuantityInCart:(state)=>{
      state.cartProductQuantity = Object.keys(state.cartProduct).length;
    },
    resetCart:(state)=>{
      state.cartProduct = {};
    }
  },
});

export const { addProductToCart,increaseProductQuantity,decreaseProductQuantity,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
