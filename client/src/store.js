import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './features/token/tokenSlice'
import authReducer from './features/slices/authSlice'
import userReducer from './features/slices/userSlice'
import jobsitesReducer from './features/slices/jobsitesSlice'
import timecardsReducer from './features/slices/timecardsSlice'

export const store = configureStore({
  reducer: {
    // token: tokenSlice,
    // auth: authReducer,
    jobsites:jobsitesReducer,
    timecards: timecardsReducer,
    user: userReducer,
  },
})