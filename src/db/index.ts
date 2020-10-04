import { Sequelize } from 'sequelize';

import config from '../config';
import logger from '../util/logger';
import { initUser } from './model/user';
import { initCountry } from './model/country';
export { User } from './model/user';
export { Country } from './model/country';

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.debug('Connection has been established successfully.');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
  });

initUser(sequelize);
initCountry(sequelize);
