const { AuthRepository } = require("../repositories/index");
const ApiError = require("../errors/ApiError");

module.exports = function (user) {
  if (user.isBlocked) {
    AuthRepository.quit(user.email);
    throw ApiError.unauthorized("Your account is blocked");
  }
};
