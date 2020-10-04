import express from 'express';
import * as middlewares from '../middlewares';

import * as controller from '../controller';
const router = express.Router();

router.get('/countries', middlewares.catchErrors(controller.allCountries));

export default router;
