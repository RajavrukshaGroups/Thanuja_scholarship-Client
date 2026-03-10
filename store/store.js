import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "application",
  storage,
};

const persistedReducer = persistReducer(persistConfig, applicationReducer);

export const store = configureStore({
  reducer: {
    application: persistedReducer,
  },
});

export const persistor = persistStore(store);
