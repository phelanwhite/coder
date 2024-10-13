import mongoose from "mongoose";
import env from "./env-config.js";

const connectMongoDB = () => {
  // Connect to MongoDB
  // Your MongoDB connection code goes here
  mongoose
    .connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DBNAME,
    })
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err?.message);
      process.exit(1);
    });
};
export default connectMongoDB;
