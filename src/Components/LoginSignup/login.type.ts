import { APIResponse } from "../../common/types/APIResponse.type";

export interface LoginApiResponse extends APIResponse<LoginResponseData> {
  //
}

export interface LoginResponseData {
  entity: Entity;
}

export interface Entity {
  user: User;
  token: Token;
}

export interface Token {
  accessToken: string;
}

export interface User {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userRoles: UserRole[];
}

export interface UserRole {
  id: string;
  role: string;
  userId: string;
  createdAt: Date;
}
