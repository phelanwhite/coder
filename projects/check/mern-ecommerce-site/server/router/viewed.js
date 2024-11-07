import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import viewedModel from "../model/viewed.js";
import { handleResponse } from "../helper/response.js";
import { customDataUserProducts } from "../helper/data.js";

const viewedRouter = express.Router();

viewedRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user._id,
    };

    const getDatas = await viewedModel
      .find(query)
      .populate([`product`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    let datas = await customDataUserProducts(user, getDatas);

    const total_row = await viewedModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all viewed successfully",
      data: {
        results: datas,
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
viewedRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await viewedModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get viewed by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
viewedRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    const checkItem = await viewedModel.findOne({
      product: body.product,
      user: user._id,
    });

    if (checkItem) {
      await viewedModel.findByIdAndDelete(checkItem._id, { new: true });
    }

    const newData = await viewedModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Add to viewed successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
viewedRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await viewedModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update viewed successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
viewedRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await viewedModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete viewed successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});
viewedRouter.delete(`/delete-all`, async (req, res, next) => {
  try {
    const user = req.user;
    const deleteDataById = await viewedModel.deleteMany(
      {
        user: user._id,
      },
      {
        new: true,
      }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete all viewed successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default viewedRouter;
