import express from "express";
import { StatusCodes } from "http-status-codes";
import commentModel from "../models/comment.model.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { handleResponse } from "../helpers/responses.js";
import { QUERY } from "../helpers/constants.js";
import { customDataComment } from "../services/customData.js";
import mongoose from "mongoose";

const commentRouter = express.Router();

commentRouter.get(`/get-comments-by-blog-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const filter = {
      $and: [{ blog: id }],
    };

    const getDatas = await commentModel
      .find(filter)
      .populate("author")
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
commentRouter.get(`/get-replies-by-comment-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const filter = {
      $and: [{ "reply.comment_id": id }],
    };

    const getDatas = await commentModel
      .find(filter)
      .populate([
        {
          path: `author`,
        },
      ])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const customData = await customDataComment({
      datas: getDatas,
    });

    const total_row = await commentModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Replies fetched successfully",
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
});

// verify
commentRouter.get(
  `/get-comments-by-me`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _page = parseInt(req.query._page) || QUERY._PAGE;
      const _skip = (_page - 1) * _limit;

      const user = req.user;

      const filter = {
        $and: [
          {
            author: user?._id,
          },
        ],
      };

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
  }
);
commentRouter.get(`/get-responses`, verifyToken, async (req, res, next) => {
  try {
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const filter = [
      {
        $lookup: {
          from: "blogs",
          localField: "blog",
          foreignField: "_id",
          as: "blog",
        },
      },
      {
        $unwind: "$blog",
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $match: {
          $or: [
            {
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
      {
        $sort: {
          createdAt: -1,
        },
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
      message: "Comments fetched successfully",
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
commentRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const newData = await commentModel.create({ ...body, author: user?._id });
    const data = await commentModel.findById(newData?._id).populate("author");

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Comment created successfully",
      data: { ...data?._doc, count_reply: 0 },
    });
  } catch (error) {
    next(error);
  }
});
commentRouter.put(
  `/like-dislike-by-comment-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;

      const checkLike = await commentModel.findOne({
        likes: user?._id,
        _id: id,
      });

      if (checkLike) {
        const deleteLike = await commentModel
          .findByIdAndUpdate(id, { $pull: { likes: user?._id } }, { new: true })
          .populate([`author`]);
        return handleResponse(res, {
          status: StatusCodes.OK,
          message: "Like removed successfully",
          data: deleteLike,
        });
      } else {
        const newLike = await commentModel
          .findByIdAndUpdate(id, { $push: { likes: user?._id } }, { new: true })
          .populate([`author`]);
        return handleResponse(res, {
          status: StatusCodes.OK,
          message: "Like added successfully",
          data: newLike,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
commentRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await commentModel.findByIdAndDelete(id, { new: true });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comment deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default commentRouter;
