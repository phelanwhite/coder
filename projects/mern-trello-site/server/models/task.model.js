import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
