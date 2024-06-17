import { Schema } from "mongoose";
import { mongodb_connect_mern_movie_site } from "../configs/db.config.js";

const myActorModel =
  mongodb_connect_mern_movie_site.models.myActor ||
  mongodb_connect_mern_movie_site.model(
    "myActor",
    new Schema(
      {
        actor_id: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        actor_type: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );
export default myActorModel;
