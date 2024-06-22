import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "./types/auth";
import { api } from "../api";
import { IAddUserRequest, IUser } from "./types/user";

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

    getAccounts: builder.query<IUser[], void>({
      query: () => ({
        url: `/auth/accounts`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Accounts" }],
    }),

    addAccount: builder.mutation<void, IAddUserRequest>({
      query: (request: IAddUserRequest) => ({
        url: `/auth/accounts`,
        method: "POST",
        body: request
      }),
      invalidatesTags: () => [{ type: "Accounts" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAccountsQuery,
  useAddAccountMutation
} = authApi;
