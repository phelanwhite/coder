import express from "express";
import userModel from "../model/user.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../middleware/verifyToken.js";

const authorRouter = express();

authorRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await userModel
      .findById(id)
      .select(["-password", "-role", "-provider"]);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Author fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// authorRouter.get(`/check-follow/:id`, verifyToken, async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const data = await userModel
//       .findById(id)
//       .select(["-password", "-role", "-provider"]);

//     return handleResponse(res, {
//       status: StatusCodes.OK,
//       message: "Author fetched successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// authorRouter.put(`/get-follower/:id`, async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

export default authorRouter;
