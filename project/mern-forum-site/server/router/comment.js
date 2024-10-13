import express from "express";
import { QUERY } from "../helper/constants.js";
import commentModel from "../model/comment.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { verifyToken } from "../middleware/verifyToken.js";
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
commentRouter.get(`/get-comments-by-blog-id/:id`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;

    const filter = {
      $and: [{ blog: req.params.id }],
    };

    const getDatas = await commentModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await commentModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments retrieved successfully",
      data: {
        result: getDatas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
commentRouter.get(
  `/get-responses-by-blogs`,
  verifyToken,
  async (req, res, next) => {
    try {
      const _q = req.query._q || QUERY.Q;
      const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
      const _page = parseInt(req.query._page) || QUERY.PAGE;
      const _skip = (_page - 1) * _limit;
      const user = req.user;
      console.log(user?._id);

      // const filter = {
      //   $and: [
      //     {
      //       author: {
      //         $not: {
      //           $eq: user?._id,
      //         },
      //       },
      //     },
      //   ],
      // };

      // const getDatas = await commentModel
      //   .find(filter)
      //   .populate([`author`, "blog"])
      //   .limit(_limit)
      //   .skip(_skip)
      //   .sort({
      //     createdAt: -1,
      //   });

      const filter = [
        {
          $lookup: {
            from: "blogs",
            localField: "blog",
            foreignField: "_id",
            as: "blog",
          },
        },
        { $unwind: "$blog" },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $match: {
            $and: [
              {
                "blog.author": new mongoose.Types.ObjectId(user?._id),
              },
              {
                "author._id": {
                  $not: {
                    $eq: new mongoose.Types.ObjectId(user?._id),
                  },
                },
              },
            ],
          },
        },
      ];

      const getDatas = await commentModel.aggregate([
        ...filter,
        {
          $skip: _skip,
        },
        {
          $limit: _limit,
        },
      ]);
      const total_row = (
        await commentModel.aggregate([
          ...filter,
          {
            $count: "count",
          },
        ])
      )?.[0]?.count;

      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Comments retrieved successfully",
        data: {
          result: getDatas,
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
commentRouter.get(
  `/get-comments-by-me`,
  verifyToken,
  async (req, res, next) => {
    try {
      const _q = req.query._q || QUERY.Q;
      const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
      const _page = parseInt(req.query._page) || QUERY.PAGE;
      const _skip = (_page - 1) * _limit;

      const user = req.user;

      const filter = {
        $and: [{ author: user._id }],
      };

      const getDatas = await commentModel
        .find(filter)
        .populate([`author`, `blog`])
        .limit(_limit)
        .skip(_skip)
        .sort({
          createdAt: -1,
        });
      const total_row = await commentModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Comments retrieved successfully",
        data: {
          result: getDatas,
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

export default commentRouter;
