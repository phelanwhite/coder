import { Schema } from "mongoose";
import { mongodb_connect_mern_ecommerce_site } from "../configs/db.config.js";

const productModel =
  mongodb_connect_mern_ecommerce_site.models.product ||
  mongodb_connect_mern_ecommerce_site.model(
    `product`,
    new Schema({
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
      },
      price: {
        type: Number,
      },
      thumbnail: {
        type: String,
      },
      images: {
        type: Schema.Types.Mixed,
      },
      review_count: {
        type: Number,
      },
      rating_average: {
        type: Number,
      },
      description: {
        type: String,
      },
      specifications: {
        type: Schema.Types.Mixed,
      },
      options: {
        type: Schema.Types.Mixed,
      },
      category: {
        type: Schema.ObjectId,
        ref: "category",
      },
      brand: {
        type: Schema.ObjectId,
        ref: "brand",
      },
    })
  );

export default productModel;
