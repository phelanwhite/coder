import mongoose, { Schema } from "mongoose";

const brandModel =
  mongoose.models.brand ||
  mongoose.model(
    `brand`,
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
        },
        thumbnail: {
          type: String,
        },
        description: {
          type: String,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default brandModel;
