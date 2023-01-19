const jwt = require("jsonwebtoken");

const ApiError = require("../errors/ApiError");

module.exports = function (req) {
  try {
    const jwtToken = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

    return decode.email;
  } catch (error) {
    throw ApiError.unauthorized();
  }
};
