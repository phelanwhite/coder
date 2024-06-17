import { Schema } from "mongoose";
import { mongodb_connect_mern_blog_site } from "../configs/db.config.js";

const commentModel =
  mongodb_connect_mern_blog_site.models.comment ||
  mongodb_connect_mern_blog_site.model(
    "comment",
    new Schema(
      {
        post_id: {
          type: Schema.Types.ObjectId,
          ref: `post`,
          required: true,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: `user`,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
export default commentModel;
