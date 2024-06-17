import express from "express";
import axios from "axios";
import { verifyToken } from "../routes/auth.route.js";
import myMovieModel from "../models/myMovie.model.js";
import env from "../configs/env.config.js";

const myMovieRoute = express.Router();

myMovieRoute.get("/", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const resData = await myMovieModel.find({ user: user._id });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_TOKEN}`,
      },
    };

    const movieList = await Promise.all(
      resData.map(async (item) => {
        const url = `https://api.themoviedb.org/3/${item?.media_type}/${item?.media_id}`;

        const resp = await (await axios.get(url, options)).data;
        const newMovie = {
          ...resp,
          _id: item?._id,
          media_type: item?.media_type,
        };

        return newMovie;
      })
    );

    return res.status(200).json(movieList);
  } catch (error) {
    next(error);
  }
});
myMovieRoute.post("/", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const checkMovie = await myMovieModel.findOne({
      media_id: body.media_id,
      media_type: body.media_type,
      user: user._id,
    });
    console.log({ checkMovie });
    if (checkMovie) {
      return res.status(201).json(`Movie added successfully`);
    }
    const newMyMovie = new myMovieModel({ ...body, user: user._id });
    await newMyMovie.save();
    return res.status(201).json(`Movie added successfully`);
  } catch (error) {
    next(error);
  }
});
myMovieRoute.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    await myMovieModel.findOneAndDelete(
      { _id: id, user: user._id },
      { new: true }
    );
    return res.status(200).json(`Movie deleted successfully`);
  } catch (error) {
    next(error);
  }
});

export default myMovieRoute;
