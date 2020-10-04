import { Sequelize } from 'sequelize';

import config from '../config';
import logger from '../util/logger';

// Option 2: Passing parameters separately (other dialects)
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
