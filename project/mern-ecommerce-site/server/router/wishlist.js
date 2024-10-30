import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import wishlistModel from "../model/wishlist.js";
import { handleResponse } from "../helper/response.js";
import { customDataUserProducts } from "../helper/data.js";

const wishlistRouter = express.Router();

wishlistRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user?._id,
    };

    const getDatas = await wishlistModel
      .find(query)
      .populate([`product`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    let datas = await customDataUserProducts(user?._id, getDatas);

    const total_row = await wishlistModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all wishlist successfully",
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
wishlistRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await wishlistModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get wishlist by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
wishlistRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    const newData = await wishlistModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Create wishlist successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
wishlistRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await wishlistModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update wishlist successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
wishlistRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await wishlistModel.findByIdAndDelete(id, {
      new: true,
    });
    s;

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete wishlist successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});
wishlistRouter.delete(`/delete-product-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const deleteDataById = await wishlistModel.findOneAndDelete(
      {
        product: id,
        user: user._id,
      },
      {
        new: true,
      }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete wishlist successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default wishlistRouter;
