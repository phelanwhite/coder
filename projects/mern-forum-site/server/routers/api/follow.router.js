import { handleResponse } from "#server/helpers/responses";
import followModel from "#server/models/follow.model";
import express from "express";
import { StatusCodes } from "http-status-codes";

const followRouter = express.Router();

followRouter.post("/follow-unfollow", async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const checkData = await followModel.findOne({
      user: user._id,
      follow: body.follow,
    });

    if (checkData) {
      const deleteData = await followModel.findOneAndDelete({
        user: user._id,
        follow: body.follow,
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Unfollowed successfully",
        data: deleteData,
      });
    } else {
      const newData = await followModel.create({
        user: user._id,
        follow: body.follow,
      });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Followed successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default followRouter;
