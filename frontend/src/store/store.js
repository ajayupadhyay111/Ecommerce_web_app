import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice.js'
import cartSlice from './features/cart/cartSlice.js'
const store = configureStore({
reducer:{
    auth:authReducer,
    cart:cartSlice,
}
})

export default store