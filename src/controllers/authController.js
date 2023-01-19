const bcrypt = require("bcrypt");

const { UserModel } = require("../models/index");
const { AuthRepository } = require("../repositories/index");

const { signUpSchema, signInSchema } = require("../validation/index");
const ApiError = require("../errors/ApiError");
const checkBLock = require("../helpers/checkBlock");
const checkJwt = require("../helpers/checkJwt");

class AuthController {
  async signIn(req, res) {
    try {
      const userData = req.body;
      const validatedCredentials = signInSchema.validateSync(userData, {
        abortEarly: false,
      });

      const user = await UserModel.findOne({
        where: { email: userData.email },
      });

      if (!user) {
        ApiError.badRequest("User not found");
      }

      const comparePassword = bcrypt.compareSync(
        userData.password,
        user.password
      );

      if (!comparePassword) {
        ApiError.badRequest("Wrong password");
      }

      checkBLock(user);

      const jwtToken = await AuthRepository.login({
        id: user.id,
        email: user.email,
      });

      return res.status(200).json({ data: jwtToken });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors });
      }

      return res.status(400).json({ error: error.message });
    }
  }
  async signUp(req, res) {
    try {
      const { body } = req;
      const data = signUpSchema.validateSync(body, { abortEarly: false });

      const candidate = await UserModel.findOne({
        where: { email: body.email },
      });

      if (candidate) {
        ApiError.badRequest("User already has been created");
      }

      const newUser = await AuthRepository.createUser(data);
      res.status(200).json({
        data: "You've successfully created account",
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors });
      }

      return res.status(400).json({ error: error.message });
    }
  }

  async quit(req, res) {
    try {
      const email = checkJwt(req);

      AuthRepository.quit(email);

      res.status(200).json("Account offline");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
