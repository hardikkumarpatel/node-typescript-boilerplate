"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _rest = require("../../../api/rest");
var _middleware = require("../../../middleware");
var UserRoutes = (0, _express.Router)();
UserRoutes.use(_middleware.ApiAuthHelperMiddleware.use);
UserRoutes.route("/create").get(_rest.UserController.getUsers);
var _default = exports.default = UserRoutes;
//# sourceMappingURL=User.routes.js.map