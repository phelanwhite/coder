// configureStore.js

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authSlice } from "./auth/services/authSlice";
import { authApi } from "./auth/services/authApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [`authSlice`],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
export let persistor = persistStore(store);
