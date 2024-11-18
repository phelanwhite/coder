import express from "express";

const userRouter = express();

userRouter.get("/", (req, res) => {
  res.json({ message: "User API is running" });
});

export default userRouter;
