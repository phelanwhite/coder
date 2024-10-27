import mongoose, { Schema } from "mongoose";

const bookmarkModel =
  mongoose.models.bookmark ||
  mongoose.model(
    `bookmark`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default bookmarkModel;
