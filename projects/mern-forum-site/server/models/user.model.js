import mongoose, { Schema } from "mongoose";
import { PROVIDER_TYPE, USER_ROLE } from "../constants/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
      required: true,
    },

    provider: [
      {
        provider_type: {
          type: String,
          enum: Object.values(PROVIDER_TYPE),
        },
        provider_id: {
          type: String,
        },
      },
    ],

    email_address: {
      type: String,
    },
    link_website: {
      type: String,
    },
    link_instagram: {
      type: String,
    },
    link_facebook: {
      type: String,
    },
    link_twitter: {
      type: String,
    },
    link_linkedin: {
      type: String,
    },
    link_pinterest: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
