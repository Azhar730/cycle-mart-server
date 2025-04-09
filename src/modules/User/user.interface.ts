import { Model } from 'mongoose';

export interface IUser {
  [x: string]: any;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  status: 'active' | 'blocked';
}
export interface UserModel extends Model<IUser> {
  isUserExistsByCustomEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
