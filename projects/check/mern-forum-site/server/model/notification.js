import mongoose, { Schema } from "mongoose";
const notificationModel =
  mongoose.models.notification ||
  mongoose.model(
    `notification`,
    new Schema(
      {
        from_user: { type: Schema.Types.ObjectId, ref: "user" },
        to_user: { type: Schema.Types.ObjectId, ref: "user" },
        type: { type: String },
        notification: { type: Schema.Types.Mixed },
        isRead: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );

export default notificationModel;
