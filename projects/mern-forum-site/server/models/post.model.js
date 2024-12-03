import mongoose, { Schema } from "mongoose";
import bookmarkModel from "./bookmark.model.js";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: { type: String },
    content: {
      type: String,
    },
    topics: { type: [String] },
    article_origin: { type: String },
    imageList: { type: [Schema.Types.Mixed] },
    description: { type: String },
    status: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    publication_time: { type: String },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

export default postModel;
