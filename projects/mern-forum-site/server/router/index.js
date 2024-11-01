import express from "express";
import passportRouter from "./passport.js";
import authRouter from "./auth.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";
import authorRouter from "./author.js";
import followRouter from "./follow.js";
import historyRouter from "./history.js";
import bookmarkRouter from "./bookmark.js";
import favoriteRouter from "./favorite.js";
import topicRouter from "./topic.js";

const router = express.Router();

router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/blog`, blogRouter);
router.use(`/comment`, commentRouter);
router.use(`/author`, authorRouter);
router.use(`/follow`, followRouter);
router.use(`/history`, historyRouter);
router.use(`/bookmark`, bookmarkRouter);
router.use(`/favorite`, favoriteRouter);
router.use(`/topic`, topicRouter);

export default router;
