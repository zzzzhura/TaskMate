//import { IUser } from "./user";

export interface IRegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  //user: IUser;
  accessToken: string;
}
