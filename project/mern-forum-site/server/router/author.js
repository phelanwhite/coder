import express from "express";
import userModel from "../model/user.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import blogModel from "../model/blog.js";
import followModel from "../model/follow.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authorRouter = express();

authorRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await userModel
      .findById(id)
      .select(["-password", "-role", "-provider"]);

    const total_blog = await blogModel.countDocuments({ author: id });
    const total_follower = await followModel.countDocuments({ follower: id });
    const total_following = await followModel.countDocuments({ following: id });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Author fetched successfully",
      data: {
        ...data?._doc,
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
