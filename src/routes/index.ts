import express, { Request, Response } from 'express';
import * as middlewares from '../middlewares';

import * as controller from '../controller';
const router = express.Router();

router.get(
  '/',
  middlewares.catchErrors(async (req: Request, res: Response) => {
    res.json('Service is up and running!');
  })
);

router.post('/login', middlewares.catchErrors(controller.login));

export default router;
