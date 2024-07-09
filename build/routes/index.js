"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _api = _interopRequireDefault(require("./api"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var routes = (0, _express.Router)();
routes.use("/api/v1", _api.default);
var _default = exports.default = routes;
//# sourceMappingURL=index.js.map