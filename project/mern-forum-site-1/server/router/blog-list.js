import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import blogListModel from "../model/blog-list.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
const blogListRouter = express.Router();

blogListRouter.get(`/check-exist-blog`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const query = req.query;

    const checkData = await blogListModel.findOne({
      author: user?._id,
      blog: query?.blog,
      list: query?.list,
    });
    return handleResponse(res, {
      status: 200,
      message: "Check exist blog successfully",
      data: checkData,
    });
  } catch (error) {
    next(error);
  }
});

blogListRouter.post(`/add-remove-blog`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkData = await blogListModel.findOne({
      author: user?._id,
      blog: body?.blog,
      list: body?.list,
    });

    if (checkData) {
      const data = await blogListModel.findOneAndDelete({
        author: user?._id,
        blog: body?.blog,
        list: body?.list,
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Remove blog successfully",
        data: data,
      });
    } else {
      const data = await blogListModel.create({
        author: user?._id,
        blog: body?.blog,
        list: body?.list,
      });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Add blog successfully",
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
});

blogListRouter.post(
  `/get-blog-by-list-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const user = req.user;

      const data = await blogListModel
        .find({
          author: user?._id,
          list: id,
        })
        .populate(["blog", "author"]);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get blog by list id successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

blogListRouter.get(
  `/get-blogs-by-list-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const page = parseInt(req.query.page) || query.PAGE;
      const limit = parseInt(req.query.limit) || query.LIMIT;
      const skip = (page - 1) * limit;
      const datas = await blogListModel
        .find({
          list: id,
        })
        .populate({
          path: "blog",
          model: "blog",
          populate: {
            path: "author",
            model: "user",
          },
        })
        .limit(limit)
        .skip(skip);

      const total_row = await blogListModel.countDocuments({ list: id });
      const total_page = Math.ceil(total_row / limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get blogs by list id successfully",
        data: { data: datas, limit, total_page, total_row, page },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default blogListRouter;
