class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    throw new ApiError(400, message);
  }

  static unauthorized() {
    throw new ApiError(401, "Unauthorized");
  }
}

module.exports = ApiError;
