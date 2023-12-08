import { api } from "./api/api.js";
import { authSlice } from "./slices/auth.slice.js";
import { mainSlice } from "./slices/main.slice.js";
import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    main: mainSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(authMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
