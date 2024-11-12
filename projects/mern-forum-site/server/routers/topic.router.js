import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import topicModel from "../models/topic.model.js";
import { handleResponse } from "../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
const topicRouter = express.Router();

topicRouter.post(`/create-many`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;

    const datas = [];
    for (const element of body?.topics) {
      const checkTopic = await topicModel.findOne({
        value: element,
      });

      if (checkTopic) {
        break;
      }

      const newData = await topicModel.create({
        value: element,
      });
      datas.push(newData);
    }
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Topic created successfully",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
});

topicRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;
    const _sort_view = req.query._sort_view ? true : false;

    const filter = {
      value: {
        $regex: _q,
        $options: "i",
      },
    };

    const getDatas = await topicModel
      .find(filter)
      .skip(_skip)
      .limit(_limit)
      .sort({
        ...(_sort_view && { count: -1 }),
        createdAt: -1,
      });
    const total_row = await topicModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Topics fetched successfully",
      data: {
        result: getDatas,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

topicRouter.get(`/get-id/:id/incriment-view`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const updateData = await topicModel.findOneAndUpdate(
      {
        value: {
          $regex: id,
          $options: "i",
        },
      },
      {
        $inc: { count: 1 },
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
export default topicRouter;
