import mongoose, { Schema } from "mongoose";
const commentModel =
  mongoose.models.comment ||
  mongoose.model(
    `comment`,
    new Schema(
      {
        type: { type: String },
        comment: { type: String, required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        blog: { type: Schema.Types.ObjectId, ref: "blog" },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
      },
      { timestamps: true }
    )
  );

export default commentModel;
