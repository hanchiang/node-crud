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
  const result = await service.getAllCountries();
  res.json(result);
};
