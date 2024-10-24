import mongoose, { Schema } from "mongoose";
const likeModel =
  mongoose.models.like ||
  mongoose.model(
    `like`,
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
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default likeModel;
