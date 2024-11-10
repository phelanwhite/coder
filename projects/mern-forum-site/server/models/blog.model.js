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
        topic: { type: [String] },
        article_origin: { type: String },
        imageList: { type: [String] },
        description: { type: String },
        status: { type: Boolean, default: false },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },

        count_views: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        publication_time: { type: String },
      },
      { timestamps: true }
    )
  );

export default blogModel;
