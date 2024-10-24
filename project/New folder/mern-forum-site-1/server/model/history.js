import mongoose, { Schema } from "mongoose";
const historyModel =
  mongoose.models.history ||
  mongoose.model(
    `history`,
    new Schema(
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        blog: {
          type: Schema.Types.ObjectId,
          ref: "blog",
        },
        type: {
          type: String,
          enum: ["blog"],
        },
      },
      { timestamps: true }
    )
  );

export default historyModel;
