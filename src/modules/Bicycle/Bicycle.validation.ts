import { z } from 'zod';

const createBicycleValidationSchema = z.object({
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  price: z
    .number()
    .min(0, { message: 'price is required and must be a positive number' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message: 'Invalid bicycle category',
  }),
  description: z.string({ required_error: 'description is required' }),
  quantity: z.number().int().min(0, {
    message: 'quantity is required and must be a non-negative integer',
  }),
});
export const bicycleValidationSchema = {
  createBicycleValidationSchema,
};
