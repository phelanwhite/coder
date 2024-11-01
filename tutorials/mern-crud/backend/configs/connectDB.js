import mongoose from "mongoose";
import env from "./env.js";

export const connectMongoDB = async () => {
  try {
    await mongoose
      .connect(env.MONGODB_URL, {
        dbName: `backend-nodejs-crud`,
      })
      .then(() => {
        console.log(`Mongoose connection successfully`);
      })
      .catch((error) => {
        console.error(error?.message);
      });
  } catch (error) {
    console.log(error);
  }
};
