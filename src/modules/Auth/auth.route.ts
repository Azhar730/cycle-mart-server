import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidation } from '../User/user.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { loginUserValidation, registerUserValidation } from './auth.validation';

const router = Router();
router.post(
  '/register',
  validateRequest(registerUserValidation),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(loginUserValidation),
  AuthControllers.login,
);
router.post(
  '/change-password',
  auth('customer', 'admin'),
  AuthControllers.changePassword,
);
router.patch(
  '/update-user-status',
  auth('admin'),
  AuthControllers.updateUserStatus,
);
router.patch(
  '/update-user-role',
  auth('admin'),
  AuthControllers.updateUserRole,
);
export const AuthRoute = router;
