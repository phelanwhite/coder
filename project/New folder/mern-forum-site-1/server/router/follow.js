import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import followModel from "../model/follow.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";

const followRouter = express.Router();

followRouter.get(`/check-following`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const { followingId } = req.query;
    const checkFollowing = await followModel.findOne({
      follower: user._id,
      following: followingId,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Check following status successfully",
      data: checkFollowing,
    });
  } catch (error) {
    next(error);
  }
});
followRouter.post(
  `/following-unfollowing`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { followingId } = req.query;
      const checkFollowing = await followModel.findOne({
        follower: user._id,
        following: followingId,
      });
      let result;
      if (!checkFollowing) {
        result = await followModel.create({
          follower: user._id,
          following: followingId,
        });
      } else {
        result = await followModel.findOneAndDelete({
          follower: user._id,
          following: followingId,
        });
      }
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: checkFollowing
          ? "Unfollowing successfully"
          : "Following successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
followRouter.get(`/get-all-following`, async (req, res, next) => {
  try {
    const { followingId } = req.query;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;
    const data = await followModel
      .find({
        following: followingId,
      })
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await followModel.countDocuments({
      following: followingId,
    });
    const total_page = Math.ceil(total_row / limit);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all following successfully",
      data: {
        data: data,
        page: page,
        limit: limit,
        total_page: total_page,
        total_row: total_row,
      },
    });
  } catch (error) {
    next(error);
  }
});

followRouter.get(`/get-all-follower`, async (req, res, next) => {
  try {
    const { followerId } = req.query;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;
    const data = await followModel
      .find({
        follower: followerId,
      })
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await followModel.countDocuments({
      follower: followerId,
    });
    const total_page = Math.ceil(total_row / limit);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all follower successfully",
      data: {
        data: data,
        page: page,
        limit: limit,
        total_page: total_page,
        total_row: total_row,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default followRouter;
