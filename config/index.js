require('dotenv').config();

const config = {
  key: {
    GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY
  },
  database: {
    history: {
      instance: process.env['DATABASE_INSTANCE'],
      name: process.env['DATABASE_NAME'],
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD']
    }
  }
};

module.exports = config;
