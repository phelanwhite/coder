import { Schema } from "mongoose";
import { mongodb_connect_mern_ecommerce_site } from "../configs/db.config.js";

const categoryModel =
  mongodb_connect_mern_ecommerce_site.models.category ||
  mongodb_connect_mern_ecommerce_site.model(
    `category`,
    new Schema({
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
      description: {
        type: String,
      },
    })
  );

export default categoryModel;
