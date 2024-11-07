import mongoose, { Schema } from "mongoose";
const favoriteModel =
  mongoose.models.favorite ||
  mongoose.model(
    `favorite`,
    new Schema(
      {
        blog: { type: Schema.Types.ObjectId, ref: "blog" },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
      },
      { timestamps: true }
    )
  );

export default favoriteModel;
