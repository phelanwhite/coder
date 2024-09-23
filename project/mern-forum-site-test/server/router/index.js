import express from "express";
import authorRouter from "./author.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";
import highlightRouter from "./highlight.js";
import listRouter from "./list.js";
import historyRouter from "./history.js";
import passportRouter from "./passport.js";
import authRouter from "./auth.js";
import blogListRouter from "./blogList.js";
import followRouter from "./follow.js";
const router = express.Router();

router.use(`/auth`, authRouter);
router.use(`/passport`, passportRouter);
router.use(`/blog-of-list`, blogListRouter);
router.use(`/blog`, blogRouter);
router.use(`/comment`, commentRouter);
router.use(`/author`, authorRouter);
router.use(`/list`, listRouter);
router.use(`/highlight`, highlightRouter);
router.use(`/history`, historyRouter);
router.use(`/follow`, followRouter);

export default router;
