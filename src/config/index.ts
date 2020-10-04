const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'mysql',
  dbUser: process.env.DB_USER || 'mysql',
  dbPassword: process.env.DB_PASSWORD || 'mysql',
};

export default config;
