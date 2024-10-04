import express from "express";
import authRouter from "./auth.js";
import passportRouter from "./passport.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";
import authorRouter from "./author.js";
import followRouter from "./follow.js";
import listRouter from "./list.js";
import highlightRouter from "./highlight.js";
import historyRouter from "./history.js";
import likeRouter from "./like.js";
import blogListRouter from "./blog-list.js";
const router = express.Router();

router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/blog`, blogRouter);
router.use(`/blog-list`, blogListRouter);
router.use(`/comment`, commentRouter);
router.use(`/author`, authorRouter);
router.use(`/follow`, followRouter);
router.use(`/list`, listRouter);
router.use(`/highlight`, highlightRouter);
router.use(`/history`, historyRouter);
router.use(`/like`, likeRouter);

export default router;
