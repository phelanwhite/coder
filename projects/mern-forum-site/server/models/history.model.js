import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: [`post`, `list`],
    },
    data: {
      type: Schema.Types.ObjectId,
      ref: "post" || "list",
    },
  },
  {
    timestamps: true,
  }
);

const historyModel =
  mongoose.models.history || mongoose.model("history", historySchema);

export default historyModel;
