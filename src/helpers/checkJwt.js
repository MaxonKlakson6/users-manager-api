const ApiError = require("../errors/ApiError");

module.exports = function (req) {
  const jwtToken = req.headers.authorization.split(" ")[1];

  if (!jwtToken) {
    throw ApiError.unauthorized();
  }
};
