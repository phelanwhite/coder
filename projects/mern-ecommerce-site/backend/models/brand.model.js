import { Schema } from "mongoose";
import { mongodb_connect_mern_ecommerce_site } from "../configs/db.config.js";

const brandModel =
  mongodb_connect_mern_ecommerce_site.models.brand ||
  mongodb_connect_mern_ecommerce_site.model(
    `brand`,
    new Schema({
      name: {
        type: String,
        required: true,
        unique: true,
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

export default brandModel;
