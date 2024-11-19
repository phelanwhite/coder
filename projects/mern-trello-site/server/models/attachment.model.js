import mongoose, { Schema } from "mongoose";

const attachmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    type: {
      type: String,
      enum: ["comment", "attachment"],
    },
  },
  {
    timestamps: true,
  }
);

const attachmentnModel =
  mongoose.models.attachment || mongoose.model("attachment", attachmentSchema);

export default attachmentnModel;
