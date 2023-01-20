const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/index");
class AuthRepository {
  async createUser({ email, name, password }) {
    const hashPassword = await bcrypt.hash(password, 4);

    const newUser = await UserModel.create({
      email,
      name,
      password: hashPassword,
    });

    return newUser.dataValues;
  }
  async login(credentials) {
    const date = new Date().toString();

    const user = UserModel.update(
      { onlineStatus: true, lastLogin: date },
      { where: { email: credentials.email } }
    );

    return jwt.sign(credentials, process.env.JWT_SECRET);
  }

  quit(email) {
    UserModel.update({ onlineStatus: false }, { where: { email } });
  }
}

module.exports = new AuthRepository();
