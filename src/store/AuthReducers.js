import { createSlice } from "@reduxjs/toolkit";
const authInitialState = {
  Token: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    login(state, actions) {
      console.log("this is login in redux");
      state.Token = actions.payload;
      state.isLogin = true;
    },
    logout(state) {
      console.log("this is logout in redux");
      state.Token = null;
      state.isLogin = false;
      localStorage.removeItem("UID");
      localStorage.removeItem("idToken");
      localStorage.removeItem("isLogin");
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
