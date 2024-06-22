export interface IAddUserForm {
  username: string;
  isAdmin?: boolean;
  email?: string;
  password: string;
}

export interface IAddUserRequest {
  username: string;
  role: "Admin" | "Client";
  email?: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  role: string;
  email?: string;
}
