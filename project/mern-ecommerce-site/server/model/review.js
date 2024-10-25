import mongoose, { Schema } from "mongoose";

const reviewModel =
  mongoose.models.review ||
  mongoose.model(
    `review`,
    new Schema(
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
        rating: {
          type: Number,
          default: 0,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
        },
        images: [{ type: String }],
      },
      {
        timestamps: true,
      }
    )
  );

export default reviewModel;
