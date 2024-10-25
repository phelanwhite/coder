import mongoose, { Schema } from "mongoose";

const categoryModel =
  mongoose.models.category ||
  mongoose.model(
    `category`,
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

export default categoryModel;
