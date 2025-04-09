import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const userRoute = Router();

userRoute.post(
  '/create-admin',
  auth('admin'),
  validateRequest(userValidation.createUserValidationSchema),
  userControllers.createUser,
);
userRoute.get('/:userId', userControllers.getSingleUser);
userRoute.put('/:userId', userControllers.updateUser);
userRoute.delete('/:userId', userControllers.deleteUser);
userRoute.get('/', userControllers.getAllUser);
export const UserRoutes = userRoute;
