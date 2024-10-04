import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
import historyModel from "../model/history.js";
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
  `/delete-all-by-me`,
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

historyRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;
    const user = req.user;

    const data = await historyModel
      .find({ author: user._id })
      .populate(["blog", "author"])
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await historyModel.countDocuments({
      author: user?._id,
    });
    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Histories retrieved successfully",
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

export default historyRouter;
