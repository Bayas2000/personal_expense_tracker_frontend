import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const AuthUserSlice = createSlice({
  name: "Login",
  initialState: {
    UserLoggedIn: false,
    UserData: null,
  },
  reducers: {
    isLoggedIn: (state, action) => {
      state.UserLoggedIn = action.payload;
    },
    getUserData: (state, action) => {
      state.UserData = action.payload;
    },
    clearUserData: (state) => {
      state.UserData = [];
    },
  },
});

export const { isLoggedIn, getUserData, clearUserData } = AuthUserSlice.actions;

export const loadUserData = () => async (dispatch) => {
  try {
    const res = await api.get("/userAuth/get-user");
    dispatch(getUserData(res.data.data));
    // console.log(res.data.data , 'res.data.data');
  } catch (error) {
    throw error;
  }
};

export default AuthUserSlice.reducer;
