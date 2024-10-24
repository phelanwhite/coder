import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
import likeModel from "../model/like.js";
const likeRouter = express.Router();

likeRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const newData = await likeModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Liked successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

likeRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await likeModel.findByIdAndDelete(id);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Unliked successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

likeRouter.get(`/get-blog-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;

    const data = await likeModel
      .find({ blog: id })
      .populate(["blog", "author"])
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await likeModel.countDocuments({ blog: id });
    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Likes retrieved successfully",
      data: {
        data: data,
        page: page,
        limit: limit,
        total_page: total_page,
        total_row: total_row,
      },
    });
  } catch (error) {
    next(error);
  }
});

likeRouter.get(`/check-like-blog`, verifyToken, async (req, res, next) => {
  try {
    const blog = req.query.blog;

    const user = req.user;
    const data = await likeModel.findOne({
      blog: blog,
      author: user._id,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Check like blog successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

likeRouter.post(`/add-remove-blog`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkData = await likeModel.findOne({
      author: user?._id,
      blog: body?.blog,
    });

    if (checkData) {
      const data = await likeModel.findOneAndDelete({
        author: user?._id,
        blog: body?.blog,
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Unliked successfully",
        data: data,
      });
    } else {
      const data = await likeModel.create({
        author: user?._id,
        blog: body?.blog,
      });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Liked successfully",
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default likeRouter;
