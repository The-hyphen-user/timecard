import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentTimecards: [],
  jobsiteTimecards: [],
  searchecTimecards: [],
};
/*
jobsiteTimecards: [
        {
            jobsiteId: null,//unique
            timecards: [],
        }

    ]
*/

export const timecardsSlice = createSlice({
  name: 'timecards',
  initialState,
  reducers: {
    setRecentTimecard: (state, action) => {
      state.recentTimecards = action.payload;
    },
    addRecentTimecard: (state, action) => {
      state.recentTimecards.push(action.payload);
    },
    addJobsiteTimecards: (state, action) => {
      const { jobsiteId, timecards } = action.payload;
      state.jobsiteTimecards.push({ jobsiteId, timecards });
    },
    replaceJobsiteTimecard: (state, action) => {
      const { jobsiteId, timecardId, timecard } = action.payload;
      const jobsiteIndex = state.jobsiteTimecards.findIndex(
        (jobsite) => jobsite.jobsiteId === jobsiteId,
      );
      const timecardIndex = state.jobsiteTimecards[
        jobsiteIndex
      ].timecards.findIndex((timecard) => timecard._id === timecardId);
      state.jobsiteTimecards[jobsiteIndex].timecards[timecardIndex] = timecard;
    },
    addTimecardToJobsiteId: (state, action) => {
      const { jobsiteId, timecard } = action.payload;
      const jobsiteIndex = state.jobsiteTimecards.findIndex(
        (jobsite) => jobsite.jobsiteId === jobsiteId,
      );
      state.jobsiteTimecards[jobsiteIndex].timecards.push(timecard);
    },
    setSearchedTimecards: (state, action) => {
      state.searchecTimecards = action.payload;
    },
  },
});

export const {
  setRecentTimecard,
  addRecentTimecard,
  addJobsiteTimecards,
  replaceJobsiteTimecard,
  addTimecardToJobsiteId,
  setSearchedTimecards,
} = timecardsSlice.actions;

export default timecardsSlice.reducer;
