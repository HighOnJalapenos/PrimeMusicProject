import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogIn: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    setUserLogOut: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUserLogIn, setUserLogOut } = userSlice.actions;

export default userSlice.reducer;
