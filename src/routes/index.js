const { Router } = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const rootRouter = new Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

module.exports = rootRouter;
