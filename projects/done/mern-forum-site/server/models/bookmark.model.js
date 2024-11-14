import mongoose, { Schema } from "mongoose";
const bookmarkModel =
  mongoose.models.bookmark ||
  mongoose.model(
    `bookmark`,
    new Schema(
      {
        blog: { type: Schema.Types.ObjectId, ref: "blog" },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
      },
      { timestamps: true }
    )
  );

export default bookmarkModel;
