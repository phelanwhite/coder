import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import historyModel from "../model/history.js";
import { customDataBlogWithUserId } from "../helper/customData.js";
const historyRouter = express.Router();

historyRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkBlog = await historyModel.findOne({
      author: user._id,
      blog: body.blog,
    });

    if (checkBlog) {
      await historyModel.findOneAndDelete(
        {
          author: user._id,
          blog: body.blog,
        },
        { new: true }
      );
    }

    const newData = await historyModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "History created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

historyRouter.delete(
  `/delete-histories-by-me`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;

      const newData = await historyModel.deleteMany({ author: user._id });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "All histories deleted successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);

historyRouter.get(
  `/get-histories-by-me`,
  verifyToken,
  async (req, res, next) => {
    try {
      const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
      const _page = parseInt(req.query._page) || QUERY.PAGE;
      const _skip = (_page - 1) * _limit;
      const user = req.user;

      const getDatas = await historyModel
        .find({ author: user._id })
        .populate([
          {
            path: "blog",
            populate: {
              path: "author",
            },
          },
          {
            path: "author",
          },
        ])
        .limit(_limit)
        .skip(_skip)
        .sort({
          createdAt: -1,
        });

      const customData = await customDataBlogWithUserId(user?._id, getDatas);

      const total_row = await historyModel.countDocuments({
        author: user?._id,
      });
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Histories retrieved successfully",
        data: {
          result: customData,
          total_row,
          total_page,
          page: _page,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default historyRouter;
