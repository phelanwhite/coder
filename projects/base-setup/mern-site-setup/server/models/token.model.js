import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tokenModel =
  mongoose.models.token || mongoose.model("token", tokenSchema);
export default tokenModel;
