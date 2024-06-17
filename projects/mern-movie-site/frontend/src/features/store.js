// configureStore.js

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./authApi";
import { authSlice } from "./authSlice";
import { myMovieApi } from "./myMovieApi";
import { myActorApi } from "./myActorApi";
import { reviewApi } from "./reviewApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [`authSlice`],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [myMovieApi.reducerPath]: myMovieApi.reducer,
  [myActorApi.reducerPath]: myActorApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(myMovieApi.middleware)
      .concat(myActorApi.middleware)
      .concat(reviewApi.middleware),
  //   devTools: process.env.NODE_ENV !== "production",
  //   preloadedState: {},
  //   enhancers: [],
});
export let persistor = persistStore(store);
