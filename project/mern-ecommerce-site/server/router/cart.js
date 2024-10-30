import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import cartModel from "../model/cart.js";
import { handleResponse } from "../helper/response.js";

const cartRouter = express.Router();

cartRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user._id,
    };

    const getDatas = await cartModel
      .find(query)
      .populate([`product`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await cartModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all cart successfully",
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
cartRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await cartModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get cart by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
cartRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    const checkItem = await cartModel.findOne({
      product: body.product,
      user: user._id,
    });

    if (checkItem) {
      const updateData = await cartModel.findOneAndUpdate(
        {
          product: body.product,
          user: user._id,
        },
        {
          ...body,
        },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Add to cart successfully",
        data: updateData,
      });
    }

    const newData = await cartModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Add to cart successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
cartRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await cartModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update cart successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
cartRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await cartModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete item successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
