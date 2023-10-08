import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  doSearch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setDoSearch: (state, action) => {
      state.doSearch = action.payload;
    },
  },
});

export const { setSearchTerm, setDoSearch } = searchSlice.actions;
export default searchSlice.reducer;
