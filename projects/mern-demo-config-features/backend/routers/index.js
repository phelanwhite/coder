import express from "express";
import authRouter from "./auth.router.js";

const routes = express.Router();

routes.use(`/auth`, authRouter);

export default routes;
