import express from "express";
import { QUERY } from "../helpers/constants.js";
import { customDataBlog } from "../services/customData.js";
import favoriteModel from "../models/favorite.model.js";
import { handleResponse } from "../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

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

favoriteRouter.delete("/delete", verifyToken, async (req, res, next) => {
  try {
    const blog = req.query.blog;
    const user = req.user;
    const deleteData = await favoriteModel.findOneAndDelete(
      {
        author: user._id,
        blog: blog,
      },
      {
        new: true,
      }
    );

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
      const _q = req.query._q || QUERY._Q;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _page = parseInt(req.query._page) || QUERY._PAGE;
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

      const customData = await customDataBlog({
        author_id: user._id,
        datas: getDatas?.map((item) => item?.blog),
      });

      const total_row = await favoriteModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Get favorites successfully",
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

export default favoriteRouter;
