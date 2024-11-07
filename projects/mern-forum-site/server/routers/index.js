import express from "express";
import passportRouter from "./passport.router.js";
import authRouter from "./auth.router.js";
import blogRouter from "./blog.router.js";
import authorRouter from "./author.router.js";
import bookmarkRouter from "./bookmark.router.js";
import historyRouter from "./history.router.js";
import favoriteRouter from "./favorite.router.js";
import followRouter from "./follow.router.js";

const router = express.Router();

router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/blog`, blogRouter);
router.use(`/author`, authorRouter);
router.use(`/bookmark`, bookmarkRouter);
router.use(`/history`, historyRouter);
router.use(`/favorite`, favoriteRouter);
router.use(`/follow`, followRouter);

export default router;
