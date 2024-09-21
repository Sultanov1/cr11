import { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  nickname: string;
  phone: string;
  token: string;
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;