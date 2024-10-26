import express from "express";
import userModel from "../model/user.js";
import { QUERY } from "../helper/constants.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { authService } from "../helper/service.js";
import createHttpError from "http-errors";
import bcryptjs from "bcrypt";

const userRouter = express.Router();

userRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const query = {};

    const getDatas = await userModel
      .find(query)
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await userModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all user successfully",
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

userRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await userModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update user successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate data
    const authValidate = authService.schemaRegister.validate(body);
    if (authValidate.error) {
      throw createHttpError(authValidate.error.message);
    }

    // check exists user
    const existsUser = await userModel.findOne({ email: body.email });
    if (existsUser) {
      throw createHttpError("User already exists");
    }

    // hash passwords
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(body.password, salt);

    // create user
    const newData = await userModel.create({
      ...body,
      password: hashedPassword,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Create user successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
