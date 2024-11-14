import mongoose, { Schema } from "mongoose";
const commentModel =
  mongoose.models.comment ||
  mongoose.model(
    `comment`,
    new Schema(
      {
        comment: { type: String, required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },

        blog: { type: Schema.Types.ObjectId, ref: "blog" },

        reply: {
          comment_id: {
            type: Schema.Types.ObjectId,
            ref: "comment",
          },
          type_id: {
            type: Schema.Types.ObjectId,
            ref: "blog" || "series",
          },
          type: {
            type: String,
            enum: ["blog", "series"],
          },
        },
      },
      { timestamps: true }
    )
  );

export default commentModel;
