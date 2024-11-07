import express from "express";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import upload from "../config/multer-config.js";
import userModel from "../model/user.js";
import blogModel from "../model/blog.js";
import commentModel from "../model/comment.js";
import favoriteModel from "../model/favorite.js";
import bookmarkModel from "../model/bookmark.js";
import followModel from "../model/follow.js";

const authRouter = express.Router();

authRouter.put(
  "/update-profile",
  upload.fields([
    {
      name: "avatar",
    },
    {
      name: "banner",
    },
  ]),
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;

      const files = req.files;

      let avatar = body.avatar;
      let banner = body.banner;

      if (files?.avatar?.[0]) {
        avatar = (await cloudinary_uploadImageFile(files?.avatar?.[0]))
          ?.secure_url;
        await cloudinary_deleteFile(body.avatar);
      }

      if (files?.banner?.[0]) {
        banner = (await cloudinary_uploadImageFile(files?.banner?.[0]))
          ?.secure_url;

        await cloudinary_deleteFile(body.banner);
      }

      const updateData = await userModel.findByIdAndUpdate(
        user?._id,
        {
          ...body,
          banner,
          avatar,
        },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Profile updated successfully",
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(`/get-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const profile = await userModel.findById(user?._id);
    const count_blog = await blogModel.countDocuments({ author: user?._id });
    const count_comment = await commentModel.countDocuments({
      author: user?._id,
    });
    const count_favorite = await favoriteModel.countDocuments({
      author: user?._id,
    });
    const count_bookmark = await bookmarkModel.countDocuments({
      author: user?._id,
    });
    const count_follower = await followModel.countDocuments({
      following: user?._id,
    });
    const count_following = await followModel.countDocuments({
      follower: user?._id,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User fetched successfully",
      data: {
        profile,
        count_blog,
        count_comment,
        count_favorite,
        count_bookmark,
        count_follower,
        count_following,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.delete("/signout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("connect.sid");
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
