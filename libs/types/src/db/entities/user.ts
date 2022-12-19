import { Uuid } from '@lib/utils';

export enum UserStatus {
  UNVERIFIED = `UNVERIFIED`,
  ACTIVE = `ACTIVE`,
  INACTIVE = `INACTIVE`,
  DEACTIVATE = `DEACTIVATE`,
}

export enum UserRole {
  ADMIN = `ADMIN`,
  MEMBER = `MEMBER`,
}

export enum SocialProvider {
  GOOGLE = `google`,
  FACEBOOK = `FACEBOOK`,
}

export interface IUser {
  id: Uuid;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  salt?: string;
  status?: UserStatus;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserParams {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  status?: UserStatus;
}
