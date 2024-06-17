import { Schema } from "mongoose";
import { mongodb_connect_mern_movie_site } from "../configs/db.config.js";

const reviewModel =
  mongodb_connect_mern_movie_site.models.review ||
  mongodb_connect_mern_movie_site.model(
    "review",
    new Schema(
      {
        media_id: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        comment: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
export default reviewModel;
