const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
  sample: '.env.',
  allowEmptyValues: false,
});

module.exports = {

  APP: {
    // PORT: process.env.APP_PORT,
    PORT: process.env.PORT,
    ENV: process.env.APP_ENV,
    SECRET: process.env.APP_SECRET,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  },

  // DB: {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT,
  //   database: process.env.DB_NAME
  // }

  DB: {
    url: process.env.DB_URL,
  }
}