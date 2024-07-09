"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class ApiResponseHelper {
  constructor() {
    var statusCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Success";
    var data = arguments.length > 2 ? arguments[2] : undefined;
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.error = null;
    this.data = data;
  }
}
exports.default = ApiResponseHelper;
//# sourceMappingURL=ApiResponse.helper.js.map