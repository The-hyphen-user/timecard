import  { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    timecard: []
};

export const timecardSlice = createSlice({
    name: 'timecard',
    initialState,
    reducers: {
        setTimecard: (state, action) => {
            state.timecard = action.payload;
        },
        resetTimecard: (state) => {
            state.timecard = initialState.timecard;
        },
        addTimecard: (state, action) => {
            state.timecard.push(action.payload);
        },
    },
});

export const { setTimecard, resetTimecard, addTimecard } = timecardSlice.actions;

export default timecardSlice.reducer;