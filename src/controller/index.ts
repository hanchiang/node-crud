import { Request, Response } from 'express';

import { throwError } from '../util/error';
import * as service from '../service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email == null) {
    throwError({
      status: 400,
      message: 'Email is required',
    });
  }
  if (password == null) {
    throwError({
      status: 400,
      message: 'Password is required',
    });
  }

  const result = await service.login(email, password);
  res.json(result);
};

export const allCountries = async (req: Request, res: Response) => {
  let result;
  if (req.query.country) {
    result = await service.getCountry(req.query.country);
    if (result == null) {
      throwError({
        status: 404,
        message: `${req.query.country} is not found`,
      });
    }
    res.json(result);
  } else {
    res.json(await service.getAllCountries());
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  if (req.body.refreshToken == null || req.body.refreshToken === '') {
    throwError({
      status: 401,
      message: 'Refresh token is required',
    });
  }
  res.json(await service.refreshToken(req.body.refreshToken));
};
