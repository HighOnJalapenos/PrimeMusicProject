import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  name: "",
  email: "",
  favSongs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogIn: (state, action) => {
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
      state.favSongs = [];
    },

    setFavSongs: (state, action) => {
      console.log(action.payload);
      state.favSongs = action.payload.map((song) => {
        return song._id;
      });
    },

    addFavSongs: (state, action) => {
      state.favSongs = [...state.favSongs, action.payload];
    },

    removeFavSongs: (state, action) => {
      state.favSongs = state.favSongs.filter((songId) => {
        return songId !== action.payload;
      });
    },
  },
});

export const {
  setUserLogIn,
  setUserLogOut,
  setFavSongs,
  addFavSongs,
  removeFavSongs,
} = userSlice.actions;

export default userSlice.reducer;
