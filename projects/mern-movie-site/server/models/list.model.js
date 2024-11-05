import mongoose, { Schema } from "mongoose";

const listModel =
  mongoose.models.list ||
  mongoose.model(
    "list",
    new Schema(
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
        description: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );

export default listModel;
