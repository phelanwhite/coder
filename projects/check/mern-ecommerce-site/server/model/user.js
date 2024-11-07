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
        role: { type: String, enum: ["member", "admin"], default: "member" },

        provider: [{ type: String, id: String }],
        tokenResetPassword: { type: String },

        avatar: { type: String },
        banner: { type: String },
        dob: { type: String },
        gender: { type: String, default: "male" },
        address: { type: String },
        education: { type: String },
        phone: { type: String },
        website: { type: String },
        socialMedia: { type: String },
        interests: { type: String },
        bio: { type: String },
        nationality: { type: String },
      },
      {
        timestamps: true,
      }
    )
  );
export default userModel;
