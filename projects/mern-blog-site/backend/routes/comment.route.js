import express from "express";
import createHttpError from "http-errors";
import { verifyToken } from "./auth.route.js";
import commentModel from "../models/comment.model.js";

const commentRoute = express.Router();

commentRoute.post(`/create-comment`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const resData = await commentModel.create({
      ...body,
      author: user._id,
    });
    res.status(201).json({
      message: "Create comment successfully",
      result: resData,
    });
  } catch (error) {
    next(error);
  }
});
commentRoute.get(
  `/get-comment-post-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const resData = await commentModel
        .find({
          post_id: id,
        })
        .populate(`author`, [`avatar`, `name`]);
      res.status(200).json(resData);
    } catch (error) {
      next(error);
    }
  }
);

export default commentRoute;
