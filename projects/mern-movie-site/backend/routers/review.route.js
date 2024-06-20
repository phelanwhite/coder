import express from "express";
import axios from "axios";
import reviewModel from "../models/review.model.js";
import envConfig from "../configs/env.config.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { responseHandle } from "../helpers/commons.js";
import { StatusCodes } from "http-status-codes";

const reviewRoute = express.Router();

reviewRoute.get("/", async (req, res, next) => {
  try {
    const media_id = req.query.media_id || "";
    const media_type = req.query.media_type || "";

    const resData = await reviewModel
      .find({ media_id: media_id })
      .sort({ updatedAt: -1 })
      .populate("user");

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
      },
    };

    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/reviews`;
    const resp = await (await axios.get(url, options)).data;

    const newResp = resp?.results?.map((item) => {
      const newItem = {
        _id: item?.id,
        comment: item?.content,
        createdAt: item?.created_at,
        updatedAt: item?.updated_at,
        user: {
          name: item?.author_details?.name || item?.author_details?.username,
          avatar: `https://image.tmdb.org/t/p/original/${item?.author_details?.avatar_path}`,
        },
      };
      return newItem;
    });

    const reviewList = [...resData, ...newResp];
    return responseHandle(res, { status: StatusCodes.OK, result: reviewList });
  } catch (error) {
    next(error);
  }
});
reviewRoute.post("/", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const newReview = new reviewModel({ ...body, user: user._id });
    await newReview.save();
    return responseHandle(res, {
      status: StatusCodes.OK,
      result: newReview,
      message: `Review added successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default reviewRoute;
