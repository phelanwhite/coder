import mongoose, { Schema } from "mongoose";
const followModel =
  mongoose.models.follow ||
  mongoose.model(
    `follow`,
    new Schema(
      {
        follower: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        following: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default followModel;
