"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync"; // synchronize the state across multiple browser tabs with the Broadcasting API
import { persistStore, persistReducer } from "redux-persist"; // allow storing and reload it when the app starts
import {
  PERSIST,
  PURGE,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
} from "redux-persist/es/constants";

import sessiontypeSlice from "./slices/sessiontype.slice";
import contentSlice from "./slices/content.slice";

import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const persistConfig = {
  key: "root",
  storage: createIdbStorage({
    name: 'janahbilal',
    storeName: 'keyval',
    version: '1'
  }),
  serialize: false, // prevent user from inspect storage value in DevTools
  deserialize: false,
  whitelist: ["content", "sessiontype"],
};

const rootReducer = combineReducers({
  sessiontype: sessiontypeSlice,
  content: contentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      createStateSyncMiddleware({
        predicate: (action) => {
          const blacklist = [PERSIST, PURGE, REHYDRATE, REGISTER, FLUSH, PAUSE];

          // Add the slice(s) you want to exclude from synchronization
          const excludedSlices = ['sessiontype'];

          if (typeof action !== "function") {
            if (Array.isArray(blacklist)) {
              // Check if the action type is not in the blacklist
              // and not related to the excluded slices
              return blacklist.indexOf(action.type) < 0 &&
                !excludedSlices.some(slice => action.type.startsWith(`${slice}/`));
            }
          }
          return false;
        },
      })
    )
});

initMessageListener(store);

export const persistor = persistStore(store);
export const makeStore = () => store;