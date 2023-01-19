const { Router } = require("express");

const { authController } = require("../controllers/index");

const authRouter = new Router();

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);
authRouter.patch("/quit", authController.quit);

module.exports = authRouter;
