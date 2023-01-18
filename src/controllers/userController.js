const { UserRepository } = require("../repositories/index");
const checkJwt = require("../helpers/checkJwt");
class UserController {
  async getUsers(req, res) {
    try {
      checkJwt(req);

      const usersList = await UserRepository.getAllUsers();

      res.json({ usersList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  async toggleUsersIsBlocked(req, res) {
    try {
      checkJwt(req);
      const { idList, isBlocked } = req.body;
      const updatedUserList = await UserRepository.changeIsBlocked(
        idList,
        isBlocked
      );

      res.json({ updatedUserList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  async deleteUsers(req, res) {
    try {
      checkJwt(req);
      const { idList } = req.body;
      const updatedUserList = await UserRepository.deleteUsers(idList);

      res.json({ updatedUserList });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
