import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProductQuantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      let productExistIndex = state.items.findIndex(item=>item.id === action.payload.id && item.size === action.payload.size);
      if(productExistIndex !== -1){
        state.items[productExistIndex].quantity += 1;
      }else{
        state.items.push({...action.payload,quantity:1})
        state.totalProductQuantity += 1
      }
    },
    deleteProductToCart: (state, action) => {
      
    },
    updateProductQuantity: (state, action) => {
      
    },
    resetCart: (state) => {
        state.items=[];
        state.totalPorductQuantity=0;
    },
  },
});

export const { addProductToCart,deleteProductToCart,updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;
