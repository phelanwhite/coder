import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import addressModel from "../model/address.js";
import { handleResponse } from "../helper/response.js";

const addressRouter = express.Router();

addressRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user._id,
    };

    const getDatas = await addressModel
      .find(query)
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await addressModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all address successfully",
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
addressRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await addressModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get address by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
addressRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    if (body?.isDefault === true) {
      await addressModel.updateMany({ isDefault: false });
    }

    const newData = await addressModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Create address successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
addressRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (body?.isDefault === true) {
      await addressModel.updateMany({ isDefault: false });
    }

    const updateDataById = await addressModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update address successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
addressRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await addressModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete address successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default addressRouter;
