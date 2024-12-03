import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema(
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

const favoriteModel =
  mongoose.models.favorite || mongoose.model("favorite", favoriteSchema);

export default favoriteModel;
