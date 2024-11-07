import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import reviewModel from "../model/review.js";
import { handleResponse } from "../helper/response.js";
import { verifyToken } from "../middleware/verifyToken.js";

const reviewRouter = express.Router();

reviewRouter.get(`/get-reviews-by-product/:id`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const id = req.params.id;

    const query = {
      product: id,
    };

    const getDatas = await reviewModel
      .find(query)
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await reviewModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all review successfully",
      data: {
        results: getDatas,
        total_row,
        total_page,
        _page,
        _limit,
        _q,
      },
    });
  } catch (error) {
    next(error);
  }
});
reviewRouter.get(`/get-reviews-by-me`, verifyToken, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user?._id,
    };

    const getDatas = await reviewModel.find(query).limit(_limit).skip(_skip);

    const total_row = await reviewModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all review successfully",
      data: {
        results: getDatas,
        total_row,
        total_page,
        _page,
        _limit,
        _q,
      },
    });
  } catch (error) {
    next(error);
  }
});
reviewRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await reviewModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get review by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
reviewRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    const newData = await reviewModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Create review successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
reviewRouter.put(`/update-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await reviewModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update review successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
reviewRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await reviewModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete review successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
