import mongoose from "mongoose";
import env from "./env.config.js";

function mongodb_connect(dbName) {
  try {
    const conn = mongoose.createConnection(env.MONGODB_URI, {
      dbName: dbName,
    });
    conn.on("connected", function () {
      console.log(`mongodb connected database ${this.name} successfully`);
    });
    conn.on("disconnected", function () {
      console.log(`mongodb disconnected database ${this.name} successfully`);
      process.exit(1);
    });
    return conn;
  } catch (error) {
    throw error;
  }
}

export const mongodb_connect_mern_ecommerce_site = mongodb_connect(
  "mern-ecommerce-site"
);
