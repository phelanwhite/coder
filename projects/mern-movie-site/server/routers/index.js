import express from "express";
import passportRouter from "./passport.router.js";
import authRouter from "./auth.router.js";
import favoriteRouter from "./favorite.router.js";
import bookmarkRouter from "./bookmark.router.js";
import commentRouter from "./comment.router.js";

const router = express.Router();

router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/favorite`, favoriteRouter);
router.use(`/bookmark`, bookmarkRouter);
router.use(`/comment`, commentRouter);

export default router;
