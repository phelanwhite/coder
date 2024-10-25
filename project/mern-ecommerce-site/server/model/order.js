import mongoose, { Schema } from "mongoose";

const orderModel =
  mongoose.models.order ||
  mongoose.model(
    `order`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        products: [
          {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
        ],
        total_price: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default orderModel;
