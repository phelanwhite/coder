import mongoose, { Schema } from "mongoose";

const blogListModel =
  mongoose.models.blogList ||
  mongoose.model(
    `blogList`,
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
        list: {
          type: Schema.Types.ObjectId,
          ref: "list",
          required: true,
        },
      },
      { timestamps: true }
    )
  );
export default blogListModel;
