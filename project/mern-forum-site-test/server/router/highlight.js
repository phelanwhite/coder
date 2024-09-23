import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import highlightModel from "../model/highlight.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
const highlightRouter = express.Router();

highlightRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const checkData = await highlightModel.findOne({
      type_id: body.type_id,
      author: user._id,
    });
    if (checkData) {
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Saved article successfully",
        data: checkData,
      });
    }

    const newData = await highlightModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Saved article successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

highlightRouter.delete(
  `/delete-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await highlightModel.findByIdAndDelete(id);
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Remove article successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

highlightRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;
    const user = req.user;

    const data = await highlightModel
      .find({ author: user._id })
      .populate(["type_id", "author"])
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await highlightModel.countDocuments({
      author: user?._id,
    });
    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Highlights retrieved successfully",
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

highlightRouter.get(
  `/check-highlight-blog`,
  verifyToken,
  async (req, res, next) => {
    try {
      const type_id = req.query.type_id;

      const user = req.user;
      const data = await highlightModel.findOne({
        type_id: type_id,
        author: user._id,
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Check highlight blog successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default highlightRouter;
