import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "task",
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    type: {
      type: String,
      enum: ["comment", "file"],
    },
  },
  {
    timestamps: true,
  }
);

const actionModel =
  mongoose.models.action || mongoose.model("action", actionSchema);

export default actionModel;
