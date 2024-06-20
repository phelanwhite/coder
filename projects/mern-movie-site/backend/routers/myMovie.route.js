import express from "express";
import axios from "axios";
import myMovieModel from "../models/myMovie.model.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { responseHandle } from "../helpers/commons.js";
import { StatusCodes } from "http-status-codes";
import envConfig from "../configs/env.config.js";

const myMovieRoute = express.Router();

myMovieRoute.get("/get-my-movie", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const resData = await myMovieModel.find({ user: user._id });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
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

    return responseHandle(res, { status: StatusCodes.OK, result: movieList });
  } catch (error) {
    next(error);
  }
});
myMovieRoute.post("/add-movie", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const checkMovie = await myMovieModel.findOne({
      media_id: body.media_id,
      media_type: body.media_type,
      user: user._id,
    });

    if (checkMovie) {
      return responseHandle(res, {
        status: StatusCodes.CREATED,
        message: `Movie added successfully`,
        result: checkMovie,
      });
    }
    const newMyMovie = new myMovieModel({ ...body, user: user._id });
    await newMyMovie.save();

    return responseHandle(res, {
      status: StatusCodes.CREATED,
      message: `Movie added successfully`,
      result: newMyMovie,
    });
  } catch (error) {
    next(error);
  }
});
myMovieRoute.delete(
  "/remove-movie-id/:id",
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = req.user;
      const movie = await myMovieModel.findOneAndDelete(
        { _id: id, user: user._id },
        { new: true }
      );
      return responseHandle(res, {
        status: StatusCodes.OK,
        message: `Movie removed successfully`,
        result: movie,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default myMovieRoute;
