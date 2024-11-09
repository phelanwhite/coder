import express from "express";
import { StatusCodes } from "http-status-codes";
import bookmarkModel from "../models/bookmark.model.js";
import { handleResponse } from "../helpers/responses.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { QUERY } from "../helpers/constants.js";
import { customDataBlog } from "../services/customData.js";

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
      const _q = req.query._q || QUERY._Q;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _page = parseInt(req.query._page) || QUERY._PAGE;
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

      const customData = await customDataBlog({
        author_id: user._id,
        datas: getDatas?.map((item) => item?.blog),
      });

      const total_row = await bookmarkModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get bookmarks successfully",
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

export default bookmarkRouter;
