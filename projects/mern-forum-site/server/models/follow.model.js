import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    follow: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const followModel =
  mongoose.models.follow || mongoose.model("follow", followSchema);

export default followModel;
