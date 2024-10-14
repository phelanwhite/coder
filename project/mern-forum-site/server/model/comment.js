import mongoose, { Schema } from "mongoose";
const commentModel =
  mongoose.models.comment ||
  mongoose.model(
    `comment`,
    new Schema(
      {
        type: { type: String },
        comment: { type: String, required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        blog: { type: Schema.Types.ObjectId, ref: "blog" },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },

        parentCommentId: {
          type: Schema.Types.ObjectId,
          ref: "comment",
        },
        parentCommentIdOfBlogId: {
          type: Schema.Types.ObjectId,
          ref: "blog",
        },
      },
      { timestamps: true }
    )
  );

export default commentModel;
