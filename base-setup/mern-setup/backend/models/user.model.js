import { Schema } from "mongoose";
import { connectMongodb } from "../configs/database.config.js";

const userModel =
  connectMongodb.models.user ||
  connectMongodb.model(
    `user`,
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        password: {
          type: String,
          required: true,
        },
        provider_id: {
          type: Schema.Types.Mixed,
        },
        provider: {
          type: Schema.Types.Mixed,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
          required: true,
        },

        resetPasswordToken: {
          type: String,
        },
        refreshToken: {
          type: String,
        },

        avatar: {
          type: Array,
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
