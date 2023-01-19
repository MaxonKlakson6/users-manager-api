const { UserModel } = require("../models/index");

class UserRepository {
  async getAllUsers() {
    const usersList = await UserModel.findAll({
      order: [["id", "ASC"]],
    });

    return usersList;
  }
  async changeIsBlocked(idList, isBlocked) {
    const updatedUserList = idList.map((id) =>
      UserModel.update({ isBlocked: isBlocked }, { where: { id } })
    );

    await Promise.all(updatedUserList);
    const usersList = await this.getAllUsers();
    return usersList;
  }

  async deleteUsers(idList) {
    const updatedUserList = idList.map((id) =>
      UserModel.destroy({ where: { id } })
    );

    await Promise.all(updatedUserList);
    const usersList = await this.getAllUsers();
    return usersList;
  }
}

module.exports = new UserRepository();
