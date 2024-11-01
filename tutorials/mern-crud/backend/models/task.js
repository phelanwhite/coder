import mongoose, { Schema } from "mongoose";

const taskModel =
  mongoose.models.task ||
  mongoose.model(
    `task`,
    new Schema(
      {
        title: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );

export default taskModel;
