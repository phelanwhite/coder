// configureStore.js

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authSlice } from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import { postApi } from "./post/postApi";
import { commentApi } from "./comment/commentApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [`authSlice`],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(postApi.middleware)
      .concat(commentApi.middleware),
  //   .concat(myActorApi.middleware)
  //   .concat(reviewApi.middleware),
  //   devTools: process.env.NODE_ENV !== "production",
  //   preloadedState: {},
  //   enhancers: [],
});
export let persistor = persistStore(store);
