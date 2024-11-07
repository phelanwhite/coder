import mongoose, { Schema } from "mongoose";

const cartModel =
  mongoose.models.cart ||
  mongoose.model(
    `cart`,
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
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default cartModel;
