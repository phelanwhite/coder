import express from "express";
import envConfig from "../configs/env.config.js";
import { responseHandle } from "../helpers/commons.js";
import { StatusCodes } from "http-status-codes";

const commonRoute = express.Router();

commonRoute.get("/get-tmdb-token", async (req, res, next) => {
  try {
    const tokenTMDB = envConfig.TMDB_TOKEN;

    return responseHandle(res, { status: StatusCodes.OK, result: tokenTMDB });
  } catch (error) {
    next(error);
  }
});

export default commonRoute;
