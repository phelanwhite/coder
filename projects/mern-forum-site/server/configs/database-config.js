import mongoose from "mongoose";
import ENV_CONFIG from "./env-config.js";

export function connectMongoDB() {
  mongoose
    .connect(ENV_CONFIG.MONGODB.MONGODB_URI, {
      dbName: ENV_CONFIG.MONGODB.MONGODB_DBNAME,
    })
    .then(function (value) {
      console.log("Connected to MongoDB:: " + value.connections[0].name);
    })
    .catch(function (err) {
      console.error("Failed to connect to MongoDB:: " + err?.message);
      process.exit(1);
    });
}
