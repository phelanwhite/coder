import mongoose, { Schema } from "mongoose";

const viewedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const viewedModel =
  mongoose.models.viewed || mongoose.model(`viewed`, viewedSchema);

export default viewedModel;
