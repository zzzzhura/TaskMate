import { JwtPayload, jwtDecode } from "jwt-decode"

export interface ExtendedJwtPayload extends JwtPayload {
    given_name: string;
  }

export const decodeToken = (token: string) => {
    const jwtPayload = jwtDecode<ExtendedJwtPayload>(token);
    return jwtPayload
}