import mongoose, { Schema } from "mongoose";
const blogModel =
  mongoose.models.blog ||
  mongoose.model(
    `blog`,
    new Schema(
      {
        title: { type: String, required: true },
        slug: { type: String },
        thumbnail: { type: String },
        content: { type: String },
        tags: { type: String },
        topic: { type: [String] },
        description: { type: String },
        status: { type: Boolean, default: false },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },

        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

export default blogModel;
