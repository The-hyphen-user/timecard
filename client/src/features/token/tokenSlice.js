//bearertoken slice for redux

//still debating wheath to use you redux or not
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}


export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        deleteToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});


export const { setToken, deleteToken } = tokenSlice.actions;


export default tokenSlice.reducer;


