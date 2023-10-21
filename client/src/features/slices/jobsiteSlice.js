import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobsite: []
};

export const jobsiteSlice = createSlice({
    name: 'jobsite',
    initialState,
    reducers: {
        setJobsite: (state, action) => {
            state.jobsite = action.payload;
        },
        resetJobsite: (state) => {
            state.jobsite = initialState.jobsite;
        },
        addJobsite: (state, action) => {
            state.jobsite.push(action.payload);
        },
    },
});

export const { setJobsite, resetJobsite, addJobsite } = jobsiteSlice.actions;

export default jobsiteSlice.reducer;