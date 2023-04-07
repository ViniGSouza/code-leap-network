import { configureStore } from "@reduxjs/toolkit";

import nameReducer from "./nameReducer";

export const store = configureStore({
  reducer: {
    user: nameReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;