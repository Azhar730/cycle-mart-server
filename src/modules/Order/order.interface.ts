import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  bicycle: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  address: string;
  phone: string;
  status?: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction?: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  shippingStatus?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
};
