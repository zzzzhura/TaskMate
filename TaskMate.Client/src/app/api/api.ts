import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { getAccessToken } from "../utils/getAccessToken";


const API_URL = import.meta.env.VITE_API_URL

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Auth", "Tags", "Notes", "Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken || getAccessToken();
      if (token && token !== null) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
