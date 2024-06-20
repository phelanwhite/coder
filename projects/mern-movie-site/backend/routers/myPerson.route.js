import express from "express";
import axios from "axios";
import envConfig from "../configs/env.config.js";
import myPersonModel from "../models/myPerson.model.js";
import { responseHandle } from "../helpers/commons.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const myPersonRoute = express.Router();

myPersonRoute.get("/get-my-person", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const resData = await myPersonModel.find({ user: user._id });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
      },
    };

    const actorList = await Promise.all(
      resData.map(async (item) => {
        const url = `https://api.themoviedb.org/3/person/${item?.person_id}`;

        const resp = await (await axios.get(url, options)).data;
        const newActor = {
          ...resp,
          _id: item?._id,
        };

        return newActor;
      })
    );

    return responseHandle(res, {
      status: StatusCodes.OK,
      result: actorList,
    });
  } catch (error) {
    next(error);
  }
});
myPersonRoute.post("/add-person", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const checkActor = await myPersonModel.findOne({
      person_id: body.person_id,
      user: user._id,
    });
    if (checkActor) {
      return responseHandle(res, {
        status: StatusCodes.OK,
        message: `Person added successfully`,
        result: checkActor,
      });
    }
    const newMyActor = new myPersonModel({ ...body, user: user._id });
    await newMyActor.save();
    return responseHandle(res, {
      status: StatusCodes.OK,
      message: `Person added successfully`,
      result: newMyActor,
    });
  } catch (error) {
    next(error);
  }
});
myPersonRoute.delete(
  "/remove-person-id/:id",
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = req.user;
      const person = await myPersonModel.findOneAndDelete(
        { _id: id, user: user._id },
        { new: true }
      );
      return responseHandle(res, {
        status: StatusCodes.OK,
        message: `Person deleted successfully`,
        result: person,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default myPersonRoute;
