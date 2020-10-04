import { User, Country } from './';
import userData from '../../user.js';
import countryData from '../../country.js';
import * as auth from '../util/auth';
import logger from '../util/logger';

// To run: npm run build && node dist/db/init.js

const work = async () => {
  try {
    await Country.bulkCreate(countryData);
    logger.debug('Inserted country data into DB');

    for (const user of userData) {
      const hashedPassword = await auth.hash(user.password);
      await User.create({
        email: user.email,
        password: hashedPassword,
      });
    }
    logger.debug('Inserted user data into DB');
  } catch (e) {
    logger.error('Encountered error while insering data into db', e);
  }
};

work();
