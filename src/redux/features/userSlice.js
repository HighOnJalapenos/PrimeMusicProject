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
    isUserLoggedIn: (state) => {
      const token = localStorage.getItem("primeMusicToken");
      if (token) {
        const name = localStorage.getItem("primeMusicUserName");
        state.token = token;
        state.name = name;
        state.isLoggedIn = true;
      }
    },
    setUserLogIn: (state, action) => {
      localStorage.setItem("primeMusicToken", action.payload.token);
      localStorage.setItem("primeMusicUserName", action.payload.name);
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    setUserLogOut: (state) => {
      localStorage.removeItem("primeMusicToken");
      localStorage.removeItem("primeMusicUserName");
      return initialState;
    },

    setFavSongs: (state, action) => {
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
  isUserLoggedIn,
} = userSlice.actions;

export default userSlice.reducer;
