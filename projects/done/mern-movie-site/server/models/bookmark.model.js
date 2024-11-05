import mongoose, { Schema } from "mongoose";

const bookmarkModel =
  mongoose.models.bookmark ||
  mongoose.model(
    "bookmark",
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

export default bookmarkModel;
