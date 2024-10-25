import mongoose, { Schema } from "mongoose";

const addressModel =
  mongoose.models.address ||
  mongoose.model(
    `address`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        name: { type: String },
        company: { type: String },
        phone: { type: String },
        address: {
          type: String,
        },
        ward: { type: String },
        district: { type: String },
        city: { type: String },
        country: { type: String },
        state: { type: String },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default addressModel;
