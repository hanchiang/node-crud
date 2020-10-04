import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { throwError, createError } from '../util/error';
import { CustomError } from '../types/error';
import * as auth from '../util/auth';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  throwError({
    status: 404,
    message: `${req.method} ${req.path} is not found`,
  });
};

/**
 * Response interceptor
 */
export const formatResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;

  res.json = function (data) {
    const retVal: any = {};
    if (res.statusCode >= 400) {
      retVal.error = data;
    } else {
      retVal.payload = data;
    }
    return oldJson.call(res, retVal);
  };
  next();
};

export const catchErrors = (action: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => action(req, res).catch(next);

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'An error ocurred';
  const error: any = {
    message: err.message || message,
  };
  if (config.nodeEnv !== 'production') {
    error.stack = err.stack;
  }
  res.status(status).json(error);
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = (
    req.header('Authorization') ||
    req.header('authorization') ||
    ''
  ).replace('Bearer ', '');
  if (token === '') {
    return next(
      createError({
        status: 401,
        message: 'Token is required',
      })
    );
  }
  try {
    await auth.verifyToken(token);
  } catch (e) {
    next(e);
  }
  next();
};
