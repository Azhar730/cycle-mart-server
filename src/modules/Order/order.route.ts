import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();
router.post(
  '/create-order',
  auth('customer', 'admin'),
  OrderControllers.createOrder,
);
router.get(
  '/verify',
  auth('customer', 'admin'),
  OrderControllers.verifyPayment,
);
router.get('/revenue', auth('admin'), OrderControllers.getRevenue);
router.get('/:id', auth('customer', 'admin'), OrderControllers.getMyOrders);
router.get('/', auth('admin'), OrderControllers.getAllOrders);
router.patch(
  '/update-status',
  auth('admin'),
  OrderControllers.updateShippingStatus,
);
export const OrderRoutes = router;
