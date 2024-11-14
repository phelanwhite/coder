import mongoose, { Schema } from "mongoose";
const listItemModel =
  mongoose.models.list_item ||
  mongoose.model(
    `list_item`,
    new Schema(
      {
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        list: {
          type: Schema.Types.ObjectId,
          ref: "list",
          required: true,
        },
        blog: { type: Schema.Types.ObjectId, ref: "blog" },
      },
      { timestamps: true }
    )
  );

export default listItemModel;
