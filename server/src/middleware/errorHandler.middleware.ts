import { Request, Response, NextFunction } from 'express';
import { IsApiError } from '../utils/apiError';

/**
 * Global error handler for all routes
 * @param err - Potentially an instance of ApiError
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  if (res.headersSent) return next(err);

  if (IsApiError(err)) {
    return res.status(err.statusCode).send({
      ...err,
      message: err.message,
    });
  }

  // Uncomment and modify as needed for environment-specific behavior
  // const currentEnv = process.env.NODE_ENV || 'development';
  // if (currentEnv === 'development' || currentEnv === 'test') {
  return res.status(500).send({
    ...err,
    message: err.message,
  });
  // }

  // return res.status(500)
  //   .send({
  //     message: 'An unexpected error occurred',
  //     code: 0,
  //   });
};

export default errorHandler;
