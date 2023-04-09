import { configureStore } from "@reduxjs/toolkit";

import nameReducer from "./reducers/nameReducer";
import updatePostsReducer from "./reducers/updatePostsReducer";

export const store = configureStore({
  reducer: {
    user: nameReducer,
    update: updatePostsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;