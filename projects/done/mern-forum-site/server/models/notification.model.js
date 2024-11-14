import mongoose, { Schema } from "mongoose";
const notificationModel =
  mongoose.models.notification ||
  mongoose.model(
    `notification`,
    new Schema(
      {
        from: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        to: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        notification: {
          data: {
            type: Schema.Types.ObjectId,
            ref: "blog" || "series",
          },
          type: {
            type: String,
            enum: ["blog", "series"],
          },
        },

        isRead: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );

export default notificationModel;
