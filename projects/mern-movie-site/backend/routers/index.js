import express from "express";
import authRouter from "./auth.router.js";
import myMovieRoute from "./myMovie.route.js";
import myPersonRoute from "./myPerson.route.js";
import reviewRouter from "./review.route.js";
import commonRoute from "./common.route.js";

const routes = express.Router();

routes.use(`/auth`, authRouter);
routes.use(`/my-movie`, myMovieRoute);
routes.use(`/my-person`, myPersonRoute);
routes.use(`/review`, reviewRouter);
routes.use(`/common`, commonRoute);

export default routes;
