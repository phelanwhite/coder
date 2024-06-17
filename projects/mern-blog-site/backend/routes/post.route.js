import express from "express";
import createHttpError from "http-errors";
import postModel from "../models/post.model.js";
import { verifyToken } from "./auth.route.js";
import multerConfig from "../configs/multer.config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadFile,
} from "../configs/cloudinary.config.js";

const postRoute = express.Router();

postRoute.post(
  `/create-post`,
  verifyToken,
  multerConfig.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const file = req.file;

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadFile(file, `post`)).url;
        await cloudinary_deleteFile(body?.thumbnail, `post`);
      }
      const resData = await postModel.create({
        ...body,
        author: user._id,
        thumbnail,
      });
      res.status(201).json({
        message: "Create post successfully",
        result: resData,
      });
    } catch (error) {
      next(error);
    }
  }
);

postRoute.put(
  `/update-post-id/:id`,
  verifyToken,
  multerConfig.single("file"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = req.user;
      const file = req.file;
      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadFile(file, `post`)).url;
        await cloudinary_deleteFile(body?.thumbnail, `post`);
      }

      const resData = await postModel.findByIdAndUpdate(
        id,
        {
          ...body,
          author: user._id,
          thumbnail,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Update post successfully",
        result: resData,
      });
    } catch (error) {
      next(error);
    }
  }
);
postRoute.delete(`/delete-post-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const resData = await postModel.findByIdAndDelete(id, { new: true });
    res.status(200).json({
      message: "Delete post successfully",
      result: resData,
    });
  } catch (error) {
    next(error);
  }
});

postRoute.get(`/get-my-post`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const resData = await postModel.find({ author: user._id });
    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
});

postRoute.get(`/get-all`, async (req, res, next) => {
  try {
    const resData = await postModel.find();
    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
});

postRoute.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;

    const resData = await postModel
      .findById(id)
      .populate("author", [`avatar`, `name`]);
    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
});

export default postRoute;
