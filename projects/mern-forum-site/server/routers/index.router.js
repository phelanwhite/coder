import express from "express";
import adminRouter from "./admin/index.router.js";
import rootRouter from "./root/index.js";
import apiRouter from "./api/index.router.js";

const router = express();

router.use("/", rootRouter);
router.use("/", apiRouter);
router.use("/admin", adminRouter);

export default router;
