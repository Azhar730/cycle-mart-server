import { NextFunction, Request, Response, Router } from 'express';
import { BicycleControllers } from './Bicycle.controller';
import { upload } from '../../app/utils/imageUpload';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { bicycleValidationSchema } from './Bicycle.validation';

const router = Router();
router.post(
  '/create-bicycle',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(bicycleValidationSchema.createBicycleValidationSchema),
  BicycleControllers.createBicycle,
);
router.get('/:productId', BicycleControllers.getSingleBicycle);
router.put(
  '/:productId',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BicycleControllers.updateBicycle,
);
router.delete('/:productId', auth('admin'), BicycleControllers.deleteBicycle);
router.get('/', BicycleControllers.getAllBicycle);
export const BicycleRoutes = router;
