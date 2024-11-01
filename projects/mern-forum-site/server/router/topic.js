import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import topicModel from "../model/topic.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";

const topicRouter = express.Router();

topicRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;

    const checkTopic = await topicModel.findOne({ title: body.title });

    if (checkTopic) {
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Topic with same title already exists",
        data: checkTopic,
      });
    } else {
      const newData = await topicModel.create({ ...body });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Topic created successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});

topicRouter.post(`/create-many`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;

    const datas = [];
    console.log({ topics: body?.topics });

    for (const element of body?.topics) {
      let checkTopic = await topicModel.findOne({
        title: {
          $regex: element,
          $options: "i",
        },
      });

      if (!checkTopic) {
        checkTopic = await topicModel.create({ title: element });
      }
      datas.push(checkTopic);
    }
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Topics created successfully",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
});

topicRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;

    const datas = await topicModel.find().skip(_skip).limit(_limit).sort({
      count: -1,
    });
    const total_row = await topicModel.countDocuments();
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "All topics fetched successfully",
      data: {
        result: datas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

topicRouter.put(`/incriment-by-id/:id`, async (req, res, next) => {
  try {
    const incrimentTopic = await topicModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { count: 1 },
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Topic incremented successfully",
      data: incrimentTopic,
    });
  } catch (error) {
    next(error);
  }
});

export default topicRouter;
