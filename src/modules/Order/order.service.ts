import AppError from '../../app/errors/AppError';
import { Bicycle } from '../Bicycle/Bicycle.model';
import User from '../User/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (
  payload: TOrder,
  user: any,
  client_ip: string,
) => {
  const bicycleData = await Bicycle.findById(payload.bicycle);
  if (!bicycleData) {
    throw new Error('Bicycle not found');
  }
  if (bicycleData.quantity < payload.quantity) {
    throw new AppError(507, 'Insufficient stock');
  }
  payload.totalPrice = bicycleData.price * payload.quantity;
  bicycleData.quantity = bicycleData.quantity - payload.quantity;
  if (bicycleData.quantity === 0) {
    bicycleData.inStock = false;
  } else {
    bicycleData.inStock = true;
  }
  await bicycleData.save();
  let newOrder = await Order.create({ ...payload, userId: user.id });
  // payment integration
  const shurjopayPayload = {
    amount: payload.totalPrice,
    order_id: newOrder._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: payload.address,
    customer_email: user.email,
    customer_phone: payload.phone,
    customer_city: user.city || "Dhaka",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    newOrder = await newOrder.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);
  return result;
};
const getMyOrdersFromDB = async (id: string) => {
  const customer = await User.findById(id);
  if (!customer) {
    throw new AppError(404, 'Customer not found !');
  }
  const result = await Order.find({ user: id });
  return result
};
const getAllOrdersFromDB = async () => {
  const result = await Order.find().populate('bicycle');
  return result;
};
const updateShippingStatusIntoDB = async (payload: {
  id: string;
  shippingStatus: string;
}) => {
  const result = await Order.findByIdAndUpdate(
    payload.id,
    {
      shippingStatus: payload.shippingStatus,
    },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, 'Something went wrong');
  }
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  verifyPayment,
  getRevenueFromDB,
  getMyOrdersFromDB,
  getAllOrdersFromDB,
  updateShippingStatusIntoDB,
};
