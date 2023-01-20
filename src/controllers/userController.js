const { UserRepository, AuthRepository } = require("../repositories/index");
const checkJwt = require("../helpers/checkJwt");
const { UserModel } = require("../models/index");
const ApiError = require("../errors/ApiError");
const checkBlock = require("../helpers/checkBlock");

class UserController {
  async getUsers(req, res) {
    try {
      const email = checkJwt(req);

      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        ApiError.unauthorized("Unauthorized");
      }

      checkBlock(user);

      const usersList = await UserRepository.getAllUsers();

      res.json({ usersList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  async toggleUsersIsBlocked(req, res) {
    try {
      const { idList, isBlocked } = req.body;
      const email = checkJwt(req);

      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        ApiError.unauthorized("Unauthorized");
      }

      checkBlock(user);

      const updatedUserList = await UserRepository.changeIsBlocked(
        idList,
        isBlocked
      );

      if (idList.includes(user.id)) {
        AuthRepository.quit(email);
        ApiError.unauthorized("Your account is blocked");
      }

      res.json({ updatedUserList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  async deleteUsers(req, res) {
    try {
      const email = checkJwt(req);

      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        ApiError.unauthorized("Unauthorized");
      }

      checkBlock(user);

      const { idList } = req.body;
      const updatedUserList = await UserRepository.deleteUsers(idList);

      if (idList.includes(user.id)) {
        ApiError.unauthorized("Unauthorized");
      }

      res.json({ updatedUserList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
