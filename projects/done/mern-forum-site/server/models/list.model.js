import mongoose, { Schema } from "mongoose";
const listModel =
  mongoose.models.list ||
  mongoose.model(
    `list`,
    new Schema(
      {
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        title: {
          type: String,
          required: true,
        },
        description: { type: String },
        imageList: { type: [String] },
      },
      { timestamps: true }
    )
  );

export default listModel;
