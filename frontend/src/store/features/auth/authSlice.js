import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
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
    logout:(state)=>{
        state.userInfo=null;
        state.accessToken = null;
        state.authenticated=false;
    }
  },
});


export const {setCredentials,setAccessToken,logout} =authSlice.actions;
export default authSlice.reducer;