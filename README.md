# Prerequisites
* Install docker: https://docs.docker.com/get-docker/
* Install docker compose: https://docs.docker.com/compose/install/
* Create a MySQL schema named `task1`
* Create MySQL tables using `src/db/schema.sql`
* Populate database with data: `npm run build && node dist/db/init.js`

# Installation
* Run nodejs and mysql: `docker-compose up -d`

# Project structure
* `src/middlewares/`: Express middlewares such as error handler, try-catch function
* `src/config/`: Application level configurations
* `src/routes/`: Express routes
* `src/controllers/`: Route handler logic
* `src/util/`: Utilities
* `src/app`: Express server setup
* `src/server`: Express Server entry point
* `test/`
  * `unit/`: Unit tests
  * `integration`: Integration tests 

# Run with docker compose
* Start: `docker-compose up -d`
  * Server is running at `localhost:3000`
* Stop: `docker-compose down`

# Run without docker compose
* Install dependencies: `npm install`
  * Server is running at `localhost:3000`
* Start server: `npm run debug`

# Note
* For this simple exercise, the RSA private key is committed to git. However for any live application, sensitive information should never be committed to git.
