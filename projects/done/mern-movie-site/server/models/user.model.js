import mongoose, { Schema } from "mongoose";

const userModel =
  mongoose.model.user ||
  mongoose.model(
    `user`,
    new Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: {
          type: String,
          enum: ["member", "admin"],
          default: "member",
          required: true,
        },
        avatar: { type: String },
        banner: { type: String },
        dob: { type: String },
        gender: { type: String, enum: ["male", "female"], default: "male" },
        address: { type: String },
        education: { type: String },
        phone: { type: String },
        interests: { type: String },
        bio: { type: String },

        provider_google: { type: String },
        provider_github: { type: String },

        link_facebook: { type: String },
        link_github: { type: String },
        link_twitter: { type: String },
        link_instagram: { type: String },
        link_twitch: { type: String },
        link_mastodon: { type: String },
        link_website: { type: String },

        reset_password_token: { type: String },
        refresh_token: { type: String },
      },
      {
        timestamps: true,
      }
    )
  );
export default userModel;
