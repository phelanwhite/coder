import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: [`post`, `list`, `series`, `discussion`],
    },
    data: {
      type: Schema.Types.ObjectId,
      ref: "post" || "list" || "series" || "discussion",
    },
  },
  {
    timestamps: true,
  }
);

const bookmarkModel =
  mongoose.models.bookmark || mongoose.model("bookmark", bookmarkSchema);

export default bookmarkModel;
