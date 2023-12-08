import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "./types/auth";
import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IRegisterRequest>({
      query: (registerRequest: IRegisterRequest) => ({
        body: registerRequest,
        url: `/auth/signUp`,
        method: "POST",
      }),
    }),

    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (loginRequest: ILoginRequest) => ({
        body: loginRequest,
        url: `/auth/signIn`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;
