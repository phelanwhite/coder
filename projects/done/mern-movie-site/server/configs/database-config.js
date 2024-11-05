import mongoose from "mongoose";
import env from "./env-config.js";

export const connectMongoDB = () => {
  mongoose
    .connect(env.MONGODB.MONGODB_URI, {
      dbName: env.MONGODB.MONGODB_DBNAME,
    })
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err?.message);
      process.exit(1);
    });
};
