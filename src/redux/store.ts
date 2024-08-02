"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { persistStore, persistReducer } from "redux-persist";
import {
  PERSIST,
  PURGE,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
} from "redux-persist/es/constants";

const storage = require('redux-persist-indexeddb-storage');

import sessiontypeSlice from "./slices/sessiontype.slice";
import contentSlice from "./slices/content.slice";

const persistConfig = {
  key: "root",
  storage: storage("janahbilal"),
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
    ) as any
});

initMessageListener(store);

export const persistor = persistStore(store);
export const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];