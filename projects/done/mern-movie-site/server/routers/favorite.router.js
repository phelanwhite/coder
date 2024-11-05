import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import favouriteModel from "../models/favorite.model.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
import { handleResponse } from "../helpers/responses.js";
import tmdbService from "../services/tmdb-api.js";

const favoriteRouter = express.Router();

favoriteRouter.delete("/delete-id/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await favouriteModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Removed from favorites successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

favoriteRouter.post("/add-remove", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const dataExists = await favouriteModel.findOne({
      user: user._id,
      media_id: body.media_id,
      media_type: body.media_type,
    });

    if (dataExists) {
      const deleteData = await favouriteModel.findOneAndDelete(
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
        message: "Removed from favorites successfully",
        data: deleteData,
      });
    } else {
      const newData = await favouriteModel.create({
        user: user._id,
        media_id: body.media_id,
        media_type: body.media_type,
      });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Added to favorites successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

favoriteRouter.get(
  "/get-favorite-by-user",
  verifyToken,
  async (req, res, next) => {
    try {
      const _page = parseInt(req.query._page) || QUERY._PAGE;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _skip = (_page - 1) * _limit;

      const user = req.user;

      const getDatas = await favouriteModel
        .find({
          user: user._id,
        })
        .limit(_limit)
        .skip(_skip)
        .sort({
          createdAt: -1,
        });

      const total_row = await favouriteModel.countDocuments({
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
        message: "Favorites retrieved successfully",
        data: { results: getMedias, _page, _limit, total_row, total_page },
      });
    } catch (error) {
      next(error);
    }
  }
);

favoriteRouter.post(`/check-exists`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const datas = [];

    for (let index = 0; index < body?.length; index++) {
      const element = body[index];

      const item = await favouriteModel.findOne({
        user: user._id,
        media_id: element.media_id,
        media_type: element.media_type,
      });

      datas.push(item);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Favourite check successful",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
});

export default favoriteRouter;
