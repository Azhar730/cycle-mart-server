import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { IUser } from '../User/user.interface';
import User from '../User/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
  };
};
const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found !');
  }
  const status = user?.status;
  if (status === 'blocked') {
    throw new AppError(400, 'User is blocked');
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(400, 'Password not match !');
  }
  const jwtPayload = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });
  const verifiedUser = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    userStatus: user?.userStatus,
  };
  return {
    verifiedUser,
    token,
  };

  // const token = jwt.sign(
  //   {
  //     id: user?._id,
  //     name: user?.name,
  //     email: user?.email,
  //     role: user?.role,
  //   },
  //   config.jwt_access_secret as string,
  //   { expiresIn: '1d' },
  // );
  // return {
  //   id: user?._id,
  //   name: user?.name,
  //   email: user?.email,
  //   role: user?.role,
  //   status: user?.status,
  //   token,
  // };
};

const changePassword = async (
  payload: {
    currentPassword: string;
    newPassword: string;
  },
  user: JwtPayload,
) => {
  const { currentPassword, newPassword } = payload;
  const userForCheck = await User.findById(user?.userId).select('+password');
  // Check if the current password matches
  if (!userForCheck?.password) {
    throw new AppError(403, 'Password not found');
  }
  const isPasswordMatched = await User.isPasswordMatched(
    currentPassword,
    userForCheck.password,
  );
  if (!isPasswordMatched) {
    return {
      success: false,
      message: 'Current password is incorrect',
    };
  }

  // Update the password
  userForCheck.password = newPassword;
  await userForCheck.save();

  return {
    success: true,
    message: 'Password changed successfully',
  };
};
const updateUserStatusIntoDB = async (payload: {
  id: string;
  status: string;
}) => {
  const result = await User.findByIdAndUpdate(
    payload.id,
    {
      status: payload.status,
    },
    { new: true },
  );
  return result;
};
const updateUserRoleIntoDB = async (payload: { id: string; role: string }) => {
  const result = await User.findByIdAndUpdate(
    payload.id,
    {
      role: payload.role,
    },
    { new: true },
  );
  return result;
};
export const AuthServices = {
  register,
  login,
  changePassword,
  updateUserStatusIntoDB,
  updateUserRoleIntoDB,
};
