import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import bookmarkModel from "../model/bookmark.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import favoriteModel from "../model/favorite.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/add-remove", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkFavorite = await favoriteModel.findOne({
      author: user._id,
      blog: body.blog,
    });

    if (checkFavorite) {
      const deleteData = await favoriteModel.findOneAndDelete(
        {
          author: user._id,
          blog: body.blog,
        },
        { new: true }
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Remove favorite successfully",
        data: deleteData,
      });
    } else {
      const newData = await favoriteModel.create({ ...body, author: user._id });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Add favorite successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

favoriteRouter.delete("/delete-id/:id", verifyToken, async (req, res, next) => {
  try {
    const deleteData = await favoriteModel.findByIdAndDelete(req.params.id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Favorite deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

favoriteRouter.get(
  "/get-favorites-by-me",
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

      const getDatas = await favoriteModel
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

      let datas = [];
      for (const element of getDatas) {
        const isBookmark = (await bookmarkModel.findOne({
          author: user?._id,
          blog: element?.blog?._id,
        }))
          ? true
          : false;

        const item = {
          ...element?._doc,
          blog: { ...element?._doc?.blog?._doc, isBookmark },
        };

        datas.push(item);
      }

      const total_row = await favoriteModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get favorites successfully",
        data: {
          result: datas,
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

export default favoriteRouter;
