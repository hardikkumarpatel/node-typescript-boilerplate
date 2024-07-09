"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _User = _interopRequireDefault(require("./user/User.routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var routes = (0, _express.Router)();
routes.use("/user", _User.default);
var _default = exports.default = routes;
//# sourceMappingURL=index.js.map