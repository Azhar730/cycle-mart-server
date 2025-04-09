import { model, Schema } from 'mongoose';
import { TBicycle } from './Bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      min: [0, 'Quantity must be a positive number'],
      required: [true, 'Quantity is required'],
    },
    inStock: {
      type: Boolean,
      default:true
    },
    isDeleted: { type: Boolean, default: false },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);
export const Bicycle = model<TBicycle>('Bicycle', bicycleSchema);
