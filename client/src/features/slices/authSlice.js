import {createSlice } from  '@reduxjs/toolkit' ;

const initialState = {
  bearerToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBearerToken: (state, action) => {
      state.bearerToken = action.payload;
    }, 
    resetBearerToken: (state) => {
      state.bearerToken = initialState.bearerToken;
    },
  },
});

export const { setBearerToken, resetBearerToken } = authSlice.actions;

export default authSlice.reducer;
