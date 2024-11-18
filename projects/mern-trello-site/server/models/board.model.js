import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
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
    favorite: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const boardModel =
  mongoose.models.board || mongoose.model("board", boardSchema);

export default boardModel;
