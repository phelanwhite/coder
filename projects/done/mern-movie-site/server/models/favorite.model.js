import mongoose, { Schema } from "mongoose";

const favouriteModel =
  mongoose.models.favourite ||
  mongoose.model(
    "favourite",
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        media_id: {
          type: String,
          required: true,
        },
        media_type: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default favouriteModel;
