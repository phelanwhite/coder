import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
import { handleResponse } from "../helpers/responses.js";
import commentModel from "../models/comment.model.js";
import tmdbService from "../services/tmdb-api.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const newData = await commentModel.create({ ...body, user: user._id });

    const getData = await commentModel
      .findById(newData?._id)
      .populate(["user"]);

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Comment created successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});

commentRouter.delete("/delete-id/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await commentModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Removed comment successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/get-by-media-id/:id", async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _skip = (_page - 1) * _limit;
    const _media_type = req.query._media_type;

    const id = req.params.id;

    const getDatas = await commentModel
      .find({ media_id: id, media_type: _media_type })
      .populate(["user"])
      .skip(_skip)
      .limit(_limit);

    const total_row = await commentModel.countDocuments({
      media_id: id,
      media_type: _media_type,
    });
    const total_page = Math.ceil(total_row / _limit);

    const getCommentsByMediaIdWithTMDB = (
      await tmdbService.getCommentsMediaIdApi({
        media_id: id,
        media_type: _media_type,
      })
    )?.results?.map((item) => {
      const newItem = {
        _id: item?.id,
        user: {
          name: item?.author_details?.name || item?.author_details?.username,
          avatar: item?.author_details?.avatar_path,
        },
        comment: item?.content,
        createdAt: item?.created_at,
        updatedAt: item?.updated_at,
      };
      return newItem;
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments retrieved successfully",
      data: {
        results: [...getDatas, ...getCommentsByMediaIdWithTMDB],
        _page,
        _limit,
        total_row,
        total_page,
      },
    });
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/get-by-user", verifyToken, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _skip = (_page - 1) * _limit;
    const user = req.user;

    const getDatas = await commentModel
      .find({
        user: user?._id,
      })
      .skip(_skip)
      .limit(_limit)
      .sort({
        createdAt: -1,
      });

    const datas = [];
    for (let index = 0; index < getDatas.length; index++) {
      const element = getDatas[index];
      const getMedia = await tmdbService.getMediaId({
        media_type: element?.media_type,
        media_id: element?.media_id,
      });
      datas.push({ data: element, getMedia });
    }

    const total_row = await commentModel.countDocuments({
      user: user._id,
    });
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comments retrieved successfully",
      data: { results: datas, _page, _limit, total_row, total_page },
    });
  } catch (err) {
    next(err);
  }
});

export default commentRouter;
