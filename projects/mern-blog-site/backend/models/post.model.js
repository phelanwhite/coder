import { Schema } from "mongoose";
import { mongodb_connect_mern_blog_site } from "../configs/db.config.js";

const postModel =
  mongodb_connect_mern_blog_site.models.post ||
  mongodb_connect_mern_blog_site.model(
    "post",
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
        },
        desc_short: {
          type: String,
        },
        desc: {
          type: String,
        },
        tags: {
          type: String,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: `user`,
          required: true,
        },
        view: {
          type: Number,
          required: true,
          default: 0,
        },
        comment: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      { timestamps: true }
    )
  );
export default postModel;
