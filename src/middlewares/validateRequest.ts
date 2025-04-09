import { AnyZodObject } from 'zod';
import catchAsync from '../app/utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};
