import mongoose from "mongoose";
import envConfig from "./env.config.js";

function databaseConfig(dbName) {
  try {
    const conn = mongoose.createConnection(envConfig.MONGO_URI, {
      dbName: dbName,
    });
    conn.on("connected", function () {
      console.log(`mongodb connected database ${this.name} successfully`);
    });
    conn.on("disconnected", function () {
      console.log(`mongodb disconnected database ${this.name} successfully`);
      process.exit(1);
    });
    conn.on("error", function (error) {
      console.log(`mongodb error database ${this.name}, error: ${error}`);
      process.exit(1);
    });
    return conn;
  } catch (error) {
    throw error;
  }
}

export const connectMongodb = databaseConfig(`test-mongodb`);
