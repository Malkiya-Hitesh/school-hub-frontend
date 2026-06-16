// store/slices/userSlice.js
// Manages logged-in user state globally
// Source of truth: /api/auth/me response

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:        null,    // { _id, name, email, phone, role, schoolId }
  isLoggedIn:  false,
  isLoading:   true,    // true on first app load while /me is being checked
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Called after /me succeeds or after login/register
    setUser: (state, action) => {
      state.user       = action.payload;
      state.isLoggedIn = true;
      state.isLoading  = false;
    },
    // Called after logout or if /me returns 401
    clearUser: (state) => {
      state.user       = null;
      state.isLoggedIn = false;
      state.isLoading  = false;
    },
    // Called while /me is in flight on app load
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;

// Selectors
export const selectUser      = (state) => state.user.user;
export const selectIsLoggedIn= (state) => state.user.isLoggedIn;
export const selectAuthLoading=(state) => state.user.isLoading;

export default userSlice.reducer;