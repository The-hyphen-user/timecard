import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentTimecards: []
};

export const recentTimecardsSlice = createSlice({
    name: 'recentTimecards',
    initialState,
    reducers: {
        setRecentTimecards: (state, action) => {
            state.recentTimecards = action.payload;
        },
        resetRecentTimecards: (state) => {
            state.recentTimecards = initialState.recentTimecards;
        },
        addRecentTimecard: (state, action) => {
            state.recentTimecards.push(action.payload);
        },
    },
});

export const { setRecentTimecards, resetRecentTimecards, addRecentTimecard } = recentTimecardsSlice.actions;

export default recentTimecardsSlice.reducer;