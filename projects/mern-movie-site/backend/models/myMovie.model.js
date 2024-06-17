import { Schema } from "mongoose";
import { mongodb_connect_mern_movie_site } from "../configs/db.config.js";

const myMovieModel =
  mongodb_connect_mern_movie_site.models.myMovie ||
  mongodb_connect_mern_movie_site.model(
    "myMovie",
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
        media_type: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
export default myMovieModel;
