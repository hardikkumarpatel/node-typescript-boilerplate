"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatusCodes = require("http-status-codes");
class ApiErrorResponseHelper extends Error {
  constructor() {
    var statusCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
    var error = arguments.length > 2 ? arguments[2] : undefined;
    var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
exports.default = ApiErrorResponseHelper;
//# sourceMappingURL=ApiErrorResponse.helper.js.map