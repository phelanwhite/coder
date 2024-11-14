import express from "express";

import { StatusCodes } from "http-status-codes";
import followModel from "../models/follow.model.js";
import { handleResponse } from "../helpers/responses.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const followRouter = express.Router();

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
