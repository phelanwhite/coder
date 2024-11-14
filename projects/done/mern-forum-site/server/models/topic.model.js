import mongoose, { Schema } from "mongoose";
const topicModel =
  mongoose.models.topic ||
  mongoose.model(
    `topic`,
    new Schema(
      {
        value: {
          type: String,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      { timestamps: true }
    )
  );

export default topicModel;
