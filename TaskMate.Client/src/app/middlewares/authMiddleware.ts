import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../api/auth/auth.api";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.accessToken) {
      localStorage.setItem("accessToken", action.payload.accessToken);
    }
  },
});
