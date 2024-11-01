import dotenv from "dotenv";
dotenv.config();

const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

export default env;
