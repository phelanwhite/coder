import dotenv from "dotenv";
dotenv.config();

const ENV_CONFIG = {
  // CLOUDINARY
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_FOLDER_NAME: process.env.CLOUDINARY_FOLDER_NAME,
  },

  // MONGODB
  MONGODB: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  },

  // JWT
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },

  // PASSPORT
  PASSPORT: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PASSPORT_REDIRECT_SUCCESS:
      process.env.NODE_ENV === "production"
        ? process.env.PASSPORT_REDIRECT_SUCCESS_PRODUCTION
        : process.env.PASSPORT_REDIRECT_SUCCESS_DEV,
    PASSPORT_REDIRECT_FAILED: process.env.PASSPORT_REDIRECT_FAILED,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },

  // EMAIL
  EMAIL: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },

  // PORT
  PORT: {
    PORT_SERVER: process.env.PORT_SERVER,
  },

  // URL
  URL: {
    URL_CLIENT:
      process.env.NODE_ENV === "production"
        ? process.env.URL_CLIENT_PRODUCTION
        : process.env.URL_CLIENT_DEV,
    URL_SERVER:
      process.env.NODE_ENV === "production"
        ? process.env.URL_SERVER_PRODUCTION
        : process.env.URL_SERVER_DEV,
    URL_WEBSITE: process.env.URL_WEBSITE,
  },
};

export default ENV_CONFIG;
