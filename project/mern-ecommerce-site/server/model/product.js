import mongoose, { Schema } from "mongoose";

const productModel =
  mongoose.models.product ||
  mongoose.model(
    `product`,
    new Schema(
      {
        name: {
          type: String,
        },
        slug: {
          type: String,
        },
        thumbnail: {
          type: String,
        },
        images: [{ type: String }],
        quantity: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default: 0,
        },
        original_price: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
        description: {
          type: String,
        },
        brand: {
          type: Schema.Types.ObjectId,
          ref: "brand",
        },
        category: {
          type: Schema.Types.ObjectId,
          ref: "category",
        },
        imported: {
          type: String,
        },
        quantity_sold: {
          type: Number,
          default: 0,
        },
        rating_average: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        review_count: {
          type: Number,
          default: 0,
        },
        configurable_options: {
          type: Schema.Types.Mixed,
        },
        specifications: {
          type: Schema.Types.Mixed,
        },
        highlight: {
          type: Schema.Types.Mixed,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );

export default productModel;
