import express from "express";
import userModel from "../models/user.model.js";
import blogModel from "../models/blog.model.js";
import { handleResponse } from "../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import followModel from "../models/follow.model.js";

const authorRouter = express();
authorRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _tracking_id = req.query._tracking_id;

    const checkFollowing = (await followModel.findOne({
      follower: _tracking_id,
      following: id,
    }))
      ? true
      : false;

    const data = await userModel
      .findById(id)
      .select(["-password", "-role", "-provider"]);

    const total_blog = await blogModel.countDocuments({ author: id });
    const total_follower = await followModel.countDocuments({ following: id });
    const total_following = await followModel.countDocuments({ follower: id });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Author fetched successfully",
      data: {
        ...data?._doc,
        isFollowing: checkFollowing,
        total_blog,
        total_follower,
        total_following,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default authorRouter;
