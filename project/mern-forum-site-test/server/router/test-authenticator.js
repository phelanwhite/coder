import express from "express";
import { StatusCodes } from "http-status-codes";
import { handleResponse } from "../helper/response.js";
import { verifyToken } from "../middleware/verifyToken.js";

const testAuthenticatorRouter = express.Router();

testAuthenticatorRouter.get("/get-all", async (req, res, next) => {
  try {
    const response =
      (await fetch("https://fakestoreapi.com/products?limit=100")
        .then((res) => res.json())
        .then((json) => json)) || [];

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Test authenticated successfully with GET request",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

testAuthenticatorRouter.post("/create", verifyToken, async (req, res, next) => {
  try {
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Test authenticated successfully with POST request",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
});

export default testAuthenticatorRouter;
