import mongoose, { Schema } from "mongoose";

const columnSchema = new Schema(
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
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const columnModel =
  mongoose.models.column || mongoose.model("column", columnSchema);

export default columnModel;
