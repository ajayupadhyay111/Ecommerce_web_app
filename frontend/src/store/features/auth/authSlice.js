import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
  accessToken:null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {

      state.userInfo = action.payload;
      state.authenticated = true;
    },
    setAccessToken:(state,action)=>{
        state.accessToken = action.payload
    },
    logout:(state)=>{
        state.userInfo=null;
        state.accessToken = null;
        state.authenticated=false;
    }
  },
});


export const {setCredentials,setAccessToken,logout} =authSlice.actions;
export default authSlice.reducer;