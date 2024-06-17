import { Schema } from "mongoose";
import { mongodb_connect_mern_ecommerce_site } from "../configs/db.config.js";

const userModel =
  mongodb_connect_mern_ecommerce_site.models.user ||
  mongodb_connect_mern_ecommerce_site.model(
    "user",
    new Schema(
      {
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          default: "https://avatar.iran.liara.run/public",
        },
        phone: {
          type: String,
        },
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        country: {
          type: String,
        },
        zip: {
          type: String,
        },
        state: {
          type: String,
        },
        bod: {
          type: String,
        },
        content: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );
export default userModel;
