import config from '../../app/config';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: result.verifiedUser,
    token:result.token
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.body, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: result.success,
    message: result.message,
  });
});
const updateUserStatus = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.updateUserStatusIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User is ${payload.status} successfully`,
    data: result,
  });
});
const updateUserRole = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.updateUserRoleIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User is ${payload.role} successfully`,
    data: result,
  });
});
export const AuthControllers = {
  register,
  login,
  changePassword,
  updateUserStatus,
  updateUserRole,
};
