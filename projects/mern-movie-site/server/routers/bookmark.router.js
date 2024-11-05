import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import bookmarkModel from "../models/bookmark.model.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
import { handleResponse } from "../helpers/responses.js";
import tmdbService from "../services/tmdb-api.js";

const bookmarkRouter = express.Router();

bookmarkRouter.delete("/delete-id/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await bookmarkModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Removed from bookmarks successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

bookmarkRouter.post("/add-remove", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const dataExists = await bookmarkModel.findOne({
      user: user._id,
      media_id: body.media_id,
      media_type: body.media_type,
    });

    if (dataExists) {
      const deleteData = await bookmarkModel.findOneAndDelete(
        {
          user: user._id,
          media_id: body.media_id,
          media_type: body.media_type,
        },
        {
          new: true,
        }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Removed from bookmarks successfully",
        data: deleteData,
      });
    } else {
      const newData = await bookmarkModel.create({
        user: user._id,
        media_id: body.media_id,
        media_type: body.media_type,
      });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Added to bookmarks successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

bookmarkRouter.get(
  "/get-bookmark-by-user",
  verifyToken,
  async (req, res, next) => {
    try {
      const _page = parseInt(req.query._page) || QUERY._PAGE;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _skip = (_page - 1) * _limit;

      const user = req.user;

      const getDatas = await bookmarkModel
        .find({
          user: user._id,
        })
        .limit(_limit)
        .skip(_skip)
        .sort({
          createdAt: -1,
        });

      const total_row = await bookmarkModel.countDocuments({
        user: user._id,
      });
      const total_page = Math.ceil(total_row / _limit);

      const getMedias = await Promise.all(
        getDatas.map(async (item) => {
          const resp = await tmdbService.getMediaId({
            media_id: item?.media_id,
            media_type: item?.media_type,
          });
          const newMedia = {
            _id: item?._id,
            media_type: item?.media_type,
            media_id: item?.media_id,
            data: resp,
          };
          return newMedia;
        })
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Bookmarks retrieved successfully",
        data: { results: getMedias, _page, _limit, total_row, total_page },
      });
    } catch (error) {
      next(error);
    }
  }
);

bookmarkRouter.post(`/check-exists`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const datas = [];

    for (let index = 0; index < body?.length; index++) {
      const element = body[index];

      const item = await bookmarkModel.findOne({
        user: user._id,
        media_id: element.media_id,
        media_type: element.media_type,
      });

      datas.push(item);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Bookmarks retrieved successfully",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
});

export default bookmarkRouter;
