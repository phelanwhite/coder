import express from "express";
import axios from "axios";
import { verifyToken } from "./auth.route.js";
import env from "../configs/env.config.js";
import myActorModel from "../models/myActor.model.js";

const myActorRoute = express.Router();

myActorRoute.get("/", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const resData = await myActorModel.find({ user: user._id });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_TOKEN}`,
      },
    };

    const actorList = await Promise.all(
      resData.map(async (item) => {
        const url = `https://api.themoviedb.org/3/person/${item?.actor_id}`;

        const resp = await (await axios.get(url, options)).data;
        const newActor = {
          ...resp,
          _id: item?._id,
        };

        return newActor;
      })
    );

    return res.status(200).json(actorList);
  } catch (error) {
    next(error);
  }
});
myActorRoute.post("/", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const checkActor = await myActorModel.findOne({
      actor_id: body.actor_id,
      user: user._id,
    });
    if (checkActor) {
      return res.status(201).json(`Actor added successfully`);
    }
    const newMyActor = new myActorModel({ ...body, user: user._id });
    await newMyActor.save();
    return res.status(201).json(`Actor added successfully`);
  } catch (error) {
    next(error);
  }
});
myActorRoute.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    await myActorModel.findOneAndDelete(
      { _id: id, user: user._id },
      { new: true }
    );
    console.log(1);
    return res.status(200).json(`Actor deleted successfully`);
  } catch (error) {
    next(error);
  }
});

export default myActorRoute;
