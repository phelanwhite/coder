import mongoose, { Schema } from "mongoose";
const topicModel =
  mongoose.models.topic ||
  mongoose.model(
    `topic`,
    new Schema(
      {
        title: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );

export default topicModel;
