import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: null,
    role: null,
    id: null,
    email: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
    updateUserBalance: (state, action) => {
      state.user.balance = action.payload;
    },
  },
});

export const { setUser, resetUser, updateUserBalance } = userSlice.actions;

export default userSlice.reducer;
