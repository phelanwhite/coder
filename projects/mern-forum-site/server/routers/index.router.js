import express from "express";
import rootRouter from "./api/index.router.js";
import adminRouter from "./admin/index.router.js";

const router = express();

router.use("/", rootRouter);
router.use("/admin", adminRouter);

export default router;
