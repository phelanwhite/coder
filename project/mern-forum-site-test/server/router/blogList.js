import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import blogListModel from "../model/blogList.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";

const blogListRouter = express.Router();

blogListRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const newData = await blogListModel.create({
      ...body,
      author: user._id,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog list created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

blogListRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;

    const data = await blogListModel
      .findByIdAndDelete(id, { new: true })
      .populate("author");

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog list deleted successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

blogListRouter.get(
  `/check-blog-of-list-id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const blog = req.query.blog;
      const list = req.query.list;
      const user = req.user;

      const data = await blogListModel.findOne({
        blog: blog,
        list: list,
        author: user._id,
      });

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Check blog of list id successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

blogListRouter.get(
  `/get-all-by-list-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const page = parseInt(req.query.page) || query.PAGE;
      const limit = parseInt(req.query.limit) || query.LIMIT;
      const skip = (page - 1) * limit;

      const data = await blogListModel
        .find({
          list: id,
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total_row = await blogListModel.countDocuments({ list: id });
      const total_page = Math.ceil(total_row / limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Blog lists retrieved successfully",
        data: { data, page, limit, total_row, total_page },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default blogListRouter;
