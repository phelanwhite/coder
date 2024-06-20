import { Schema } from "mongoose";
import { mongodb_movie_site } from "../configs/database.config.js";

const myPersonModel =
  mongodb_movie_site.models.myPerson ||
  mongodb_movie_site.model(
    "myPerson",
    new Schema(
      {
        person_id: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        person_type: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );
export default myPersonModel;
