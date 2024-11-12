import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import notificationModel from "../models/notification.model.js";
import { handleResponse } from "../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import followModel from "../models/follow.model.js";
import { QUERY } from "../helpers/constants.js";
import { customDataBlog } from "../services/customData.js";

const notificationRouter = express.Router();

notificationRouter.post(
  "/create-notification-blog",
  verifyToken,
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;

      const followers = await followModel.find({
        following: user?._id,
      });
      for (const element of followers) {
        const item = {
          from: user?._id,
          to: element?.follower,
          notification: {
            data: body?.blog_id,
            type: "blog",
          },
        };
        await notificationModel.create(item);
      }
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Create notification successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
notificationRouter.get(
  "/get-notifications-by-me",
  verifyToken,
  async (req, res, next) => {
    try {
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _page = parseInt(req.query._page) || QUERY._PAGE;
      const _skip = (_page - 1) * _limit;
      const user = req.user;

      const filter = {
        to: user?._id,
      };

      const getDatas = await notificationModel
        .find(filter)
        .populate([
          {
            path: "from",
          },
          {
            path: "to",
          },
          {
            path: "notification.data",
            populate: {
              path: "author",
            },
          },
        ])
        .limit(_limit)
        .skip(_skip)
        .sort({
          createdAt: -1,
        });

      const customDatas = await customDataBlog({
        author_id: user?._id,
        datas: getDatas?.map((item) => item?.notification?.data),
      });

      const total_row = await notificationModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Notifications fetched successfully",
        data: {
          result: customDatas,
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
notificationRouter.delete("/delete", verifyToken, async (req, res, next) => {
  try {
    const blog = req.query.blog;
    const user = req.user;
    const deleteData = await notificationModel.findOneAndDelete(
      {
        to: user._id,
        "notification.data": blog,
      },
      {
        new: true,
      }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Notification deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default notificationRouter;
