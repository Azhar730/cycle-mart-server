import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../app/interface/error';
import { ZodError } from 'zod';
import handleZodError from '../app/errors/handleZodError';
import handleValidationError from '../app/errors/handleValidationError';
import handleCastError from '../app/errors/handleCastError';
import AppError from '../app/errors/AppError';
import config from '../app/config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something Went Wrong !';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong !',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err.name === 'CastError') {
    const simplifiedErrors = handleCastError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedErrors = handleCastError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
export default globalErrorHandler;
