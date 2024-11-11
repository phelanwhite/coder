import express from "express";
import { QUERY } from "../helpers/constants.js";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";
import userModel from "../models/user.model.js";
import { customDataBlog, customDataComment } from "../services/customData.js";
import { StatusCodes } from "http-status-codes";
import { handleResponse } from "../helpers/responses.js";
const adminRouter = express.Router();

adminRouter.get(`/get-blogs`, async (req, res, next) => {
  try {
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const _status = req.query._status === "1" ? true : false;

    const user = req.user;

    const filter = {
      $and: [
        {
          status: _status,
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    const customData = await customDataBlog({
      author_id: user?._id,
      datas: getDatas,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
adminRouter.get(`/get-comments`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const filter = {};

    const getDatas = await commentModel
      .find(filter)
      .populate([
        {
          path: `author`,
        },
        {
          path: "blog",
          populate: {
            path: "author",
          },
        },
        {
          path: "reply",
          populate: [
            {
              path: `comment_id`,
            },
            {
              path: "type_id",
            },
          ],
        },
      ])
      .sort({ createdAt: -1 })
      .skip(_skip)
      .limit(_limit);

    const total_row = await commentModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    const customData = await customDataComment({
      datas: getDatas,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments fetched successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
adminRouter.get(`/get-users`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const filter = {};

    const getDatas = await userModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(_skip)
      .limit(_limit);

    const total_row = await userModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Users fetched successfully",
      data: {
        result: getDatas,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default adminRouter;
