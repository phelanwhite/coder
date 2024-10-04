import mongoose, { Schema } from "mongoose";
const listModel =
  mongoose.models.list ||
  mongoose.model(
    `list`,
    new Schema(
      {
        title: { type: String, required: true },
        topic: { type: [String] },
        description: { type: String },
        status: { type: Boolean, default: false },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },

        views: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

export default listModel;
