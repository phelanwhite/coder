import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import bookmarkModel from "../model/bookmark.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import { customDataBlogWithUserId } from "../helper/customData.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/add-remove", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkBookmark = await bookmarkModel.findOne({
      author: user._id,
      blog: body.blog,
    });

    if (checkBookmark) {
      const deleteData = await bookmarkModel.findOneAndDelete(
        {
          author: user._id,
          blog: body.blog,
        },
        { new: true }
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Remove bookmark successfully",
        data: deleteData,
      });
    } else {
      const newData = await bookmarkModel.create({ ...body, author: user._id });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Add bookmark successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

bookmarkRouter.get(
  "/get-bookmarks-by-me",
  verifyToken,
  async (req, res, next) => {
    try {
      const _q = req.query._q || QUERY.Q;
      const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
      const _page = parseInt(req.query._page) || QUERY.PAGE;
      const _skip = (_page - 1) * _limit;
      const _status = true;
      const user = req.user;

      const filter = {
        $and: [{ author: user._id }],
      };

      const getDatas = await bookmarkModel
        .find(filter)
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

      const total_row = await bookmarkModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get bookmarks successfully",
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

export default bookmarkRouter;