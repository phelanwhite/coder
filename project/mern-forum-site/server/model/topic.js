import mongoose, { Schema } from "mongoose";
const topicModel =
  mongoose.models.topic ||
  mongoose.model(
    `topic`,
    new Schema(
      {
        title: { type: String, required: true },
        count: { type: Number, required: true, default: 0 },
      },
      { timestamps: true }
    )
  );

export default topicModel;
