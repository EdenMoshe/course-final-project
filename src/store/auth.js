import { createSlice } from "@reduxjs/toolkit";

/*
    create variables that we want redux to store for us 
*/
const initialAuthState = {
  loggedIn: localStorage.getItem("tokenKey") ? true : false,
  loggedInName: "Guest",
  loggedInPhone: "",
  loggedInAddress: "",
  loggedInId: "",
  userData: [],
};

/*
    this is a redux toolkit pattern to
    create the state for redux its self
    create actions/reducers to manipulate the state
*/
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logOut(state) {
      state.loggedIn = false;
      state.userData = [];
    },
    userId(state, action) {
      // console.log("action", action);
      state.loggedInId = action.payload;
    },
    loginUser(state, action) {
      state.loggedInName = action.payload;
    },
    loginPhone(state, action) {
      state.loggedInPhone = action.payload;
    },
    loginAddress(state, action) {
      state.loggedInAddress = action.payload;
    },
    updatedUser(state, action) {
      state.userData = action.payload;
    },
  },
});

//export the actions so we can modify the variables from other components
export const authActions = authSlice.actions;

export default authSlice.reducer;
