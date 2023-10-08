import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import playerReducer from "./features/playerSlice";
import searchReducer from "./features/searchSlice";
import { shazamCoreApi } from "./services/shazamCore";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefauktMiddleware) =>
    getDefauktMiddleware().concat(shazamCoreApi.middleware),
});
