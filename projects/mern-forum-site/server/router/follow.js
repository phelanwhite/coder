import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import followModel from "../model/follow.js";
import { StatusCodes } from "http-status-codes";

const followRouter = express.Router();

followRouter.get(
  `/check-following/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const checkFollowing = await followModel.findOne({
        follower: user._id,
        following: req.params.id,
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Check following status successfully",
        data: checkFollowing,
      });
    } catch (error) {
      next(error);
    }
  }
);
followRouter.post(
  `/following-unfollowing/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;

      const checkFollowing = await followModel.findOne({
        follower: user._id,
        following: req.params.id,
      });
      let result;
      if (!checkFollowing) {
        result = await followModel.create({
          follower: user._id,
          following: req.params.id,
        });
      } else {
        result = await followModel.findOneAndDelete({
          follower: user._id,
          following: req.params.id,
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

export default followRouter;
