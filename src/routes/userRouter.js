const { Router } = require("express");

const { userController } = require("../controllers/index");

const userRouter = new Router();

userRouter.get("/", userController.getUsers);
userRouter.delete("/", userController.deleteUsers);
userRouter.patch("/", userController.toggleUsersIsBlocked);

module.exports = userRouter;
