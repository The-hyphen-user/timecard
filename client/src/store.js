import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './features/token/tokenSlice'
import authReducer from './features/slices/authSlice'
import userReducer from './features/slices/userSlice'

export const store = configureStore({
  reducer: {
    // token: tokenSlice,
    // auth: authReducer,
    user: userReducer,
  },
})