/*
jobsite: {
        _id: null,
        name: null,
        address: null,
        city: null,
        startDate: null,
        isMisc: null,
        description: null,
        totalHoursSoFar: null,
        createDate: null,
        lastWorked: null
    }
*/
// jobsitesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchedJobsites: [],
  recentJobsitesToMe: [],
  recentJobsitesToAll: [],
  selectedJobsite: {
    _id: null,
    name: null,
    address: null,
    city: null,
    startDate: null,
    isMisc: null,
    description: null,
    totalHoursSoFar: null,
    createDate: null,
    lastWorked: null,
    imageURL: null,
  }, //jobsites.recentJobsitesToMe
};

export const jobsitesSlice = createSlice({
  name: 'jobsites',
  initialState,
  reducers: {
    setSearchedJobsites: (state, action) => {
      state.searchedJobsites = action.payload;
    },
    setRecentJobsitesToMe: (state, action) => {
      state.recentJobsitesToMe = action.payload;
    },
    setRecentJobsitesToAll: (state, action) => {
      state.recentJobsitesToAll = action.payload;
    },
    setSelectedJobsite: (state, action) => {
      state.selectedJobsite = action.payload;
    },
    addRecentToMeIfNeeded: (state, action) => {
      const { newRecentJobsite } = action.payload;

      const exsists = state.recentJobsitesToMe.find(
        (jobsite) => jobsite._id === newRecentJobsite._id)
      if (!exsists) {
        state.recentJobsitesToMe = [...state.recentJobsitesToMe, newRecentJobsite];
      }
    },
    replaceInSearchedJobsites: (state, action) => {
      const { itemId, newItem } = action.payload;
      state.searchedJobsites = state.searchedJobsites.map((item) =>
        item._id === itemId ? newItem : item,
      );
    },
    replaceInRecentJobsitesToMe: (state, action) => {
      const { itemId, newItem } = action.payload;
      state.recentJobsitesToMe = state.recentJobsitesToMe.map((item) =>
        item._id === itemId ? newItem : item,
      );
    },
    replaceInRecentJobsitesToAll: (state, action) => {
      const { itemId, newItem } = action.payload;
      state.recentJobsitesToAll = state.recentJobsitesToAll.map((item) =>
        item._id === itemId ? newItem : item,
      );
    },
    updateJobSiteInAllArrays: (state, action) => {
      const { updatedJobsite } = action.payload;

      // Replace item in searchedJobsites array
      state.searchedJobsites = state.searchedJobsites.map((jobsite) =>
        updatedJobsite._id === jobsite._id ? updatedJobsite : jobsite,
      );

      // Replace item in recentJobsitesToMe array
      state.recentJobsitesToMe = state.recentJobsitesToMe.map((jobsite) =>
        updatedJobsite._id === jobsite._id ? updatedJobsite : jobsite,
      );

      // Replace item in recentJobsitesToAll array
      state.recentJobsitesToAll = state.recentJobsitesToAll.map((jobsite) =>
        updatedJobsite._id === jobsite._id ? updatedJobsite : jobsite,
      );

      if (state.selectedJobsite._id === updatedJobsite._id) {
        state.selectedJobsite = updatedJobsite
      }
    },
  },
});

export const {
  setSearchedJobsites,
  setRecentJobsitesToMe,
  setRecentJobsitesToAll,
  setSelectedJobsite,
  addRecentToMeIfNeeded,
  replaceInSearchedJobsites,
  replaceInRecentJobsitesToMe,
  replaceInRecentJobsitesToAll,
  updateJobSiteInAllArrays,
} = jobsitesSlice.actions;

export default jobsitesSlice.reducer;
