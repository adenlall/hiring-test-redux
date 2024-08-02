"use client";

import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./store";

export const PersisterProvider = ({
  children,
}) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
