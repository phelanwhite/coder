import mongoose, { Schema } from "mongoose";
const highlightModel =
  mongoose.models.highlight ||
  mongoose.model(
    `highlight`,
    new Schema(
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        blog: {
          type: Schema.Types.ObjectId,
          ref: "blog",
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default highlightModel;
