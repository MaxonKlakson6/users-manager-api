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
  async createJwt(credentials) {
    return jwt.sign(credentials, process.env.JWT_SECRET);
  }
}

module.exports = new AuthRepository();
