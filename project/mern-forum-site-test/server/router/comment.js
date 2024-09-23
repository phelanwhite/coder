import express from "express";
import commentModel from "../model/comment.js";
import blogModel from "../model/blog.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";

const commentRouter = express.Router();

commentRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const newData = await commentModel.create({ ...body, author: user?._id });
    const data = await commentModel.findById(newData?._id).populate("author");
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Comment created successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
commentRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await commentModel.findByIdAndDelete(id);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comment deleted successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
commentRouter.get(`/get-all-by-blog-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;

    const data = await commentModel
      .find({
        blog: id,
      })
      .populate("author")
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await commentModel.countDocuments({
      blog: id,
    });
    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments retrieved successfully",
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
commentRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;

    const data = await commentModel
      .find({
        author: user?._id,
      })
      .populate(["author", "blog"])
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await commentModel.countDocuments({
      author: user?._id,
    });
    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments retrieved successfully",
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

commentRouter.get(
  `/get-all-by-response`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const page = parseInt(req.query.page) || query.PAGE;
      const limit = parseInt(req.query.limit) || query.LIMIT;
      const skip = (page - 1) * limit;

      const blogs = await blogModel.find({
        author: user?._id,
      });
      console.log(blogs);

      console.log({
        blogs: blogs
          .map((item) => item._id)
          .toString()
          .split(","),
      });

      const data = await commentModel
        .find({
          blog: {
            $in: blogs
              .map((item) => item._id)
              .toString()
              .split(","),
          },
        })
        .populate(["comment"])
        .limit(limit)
        .skip(skip)
        .sort({
          createdAt: -1,
        });

      const total_row = await commentModel.countDocuments({
        author: user?._id,
      });
      const total_page = Math.ceil(total_row / limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Comments retrieved successfully",
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
  }
);

export default commentRouter;
