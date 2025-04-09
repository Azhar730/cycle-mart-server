import config from '../app/config';
import AppError from '../app/errors/AppError';
import catchAsync from '../app/utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User/user.model';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized');
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { id, role } = decoded;
    const user = await User.findById(id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
