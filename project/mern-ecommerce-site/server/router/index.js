import express from "express";
import { verifyToken, verifyTokenAdmin } from "../middleware/verifyToken.js";
import passportRouter from "./passport.js";
import authRouter from "./auth.js";
import brandRouter from "./brand.js";
import categoryRouter from "./category.js";
import addressRouter from "./address.js";
import wishlistRouter from "./wishlist.js";
import bookmarkRouter from "./bookmark.js";
import cartRouter from "./cart.js";
import reviewRouter from "./review.js";
import productRouter from "./product.js";
import userRouter from "./user.js";
import viewedRouter from "./viewed.js";

const router = express.Router();

// user
router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/address`, verifyToken, addressRouter);
router.use(`/bookmark`, verifyToken, bookmarkRouter);
router.use(`/cart`, verifyToken, cartRouter);
router.use(`/wishlist`, verifyToken, wishlistRouter);
router.use(`/viewed`, verifyToken, viewedRouter);
router.use(`/review`, reviewRouter);

// admin
router.use(`/user`, verifyTokenAdmin, userRouter);
router.use(`/brand`, brandRouter);
router.use(`/category`, categoryRouter);
router.use(`/product`, productRouter);

export default router;
