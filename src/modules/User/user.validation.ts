import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be provided and must be string',
    })
    .min(3)
    .max(50),
  age: z.number().optional(),
  email: z
    .string({
      required_error: 'Email must be provided and must be string',
    })
    .email('Invalid email formate'),
  password: z.string({ required_error: 'password must be needed' }),
  // photoURL: z.string().optional(),
});
const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  email: z.string().email('Invalid email formate').optional(),
  password: z.string().optional(),
  // photoURL: z.string().optional(),
});
export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
