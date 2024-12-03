import express from "express";
import userModel from "../../models/user.model.js";
import { QUERY_PARAMETER } from "../../constants/index.js";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
const authorRouter = express.Router();
authorRouter.get(`/get-authors`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY_PARAMETER._Q;
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const skip = (_page - 1) * _limit;

    const filter = {
      name: {
        $regex: _q,
        $options: "i",
      },
    };

    const getDatas = await userModel
      .find(filter)
      .select(["-resetPasswordExpires", "-resetPasswordToken", "-password"])
      .skip(skip)
      .limit(_limit)
      .sort({
        createdAt: -1,
      });
    const total_rows = await userModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Authors fetched successfully",
      data: {
        results: getDatas,
        total_rows,
        total_pages,
        _page,
        _limit,
      },
    });
  } catch (error) {
    next(error);
  }
});
export default authorRouter;
