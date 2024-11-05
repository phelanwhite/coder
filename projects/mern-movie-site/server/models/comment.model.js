import mongoose, { Schema } from "mongoose";

const commentModel =
  mongoose.models.comment ||
  mongoose.model(
    "comment",
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
        comment: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default commentModel;
