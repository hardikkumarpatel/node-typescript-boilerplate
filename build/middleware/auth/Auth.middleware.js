"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _helpers = require("../../helpers");
var _httpStatusCodes = require("http-status-codes");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ApiAuthHelperMiddleware {}
_defineProperty(ApiAuthHelperMiddleware, "use", _helpers.ApiAsyncHelper.AsyncHandler( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var _headers$authorizatio;
    var {
      headers
    } = req;
    if (!((_headers$authorizatio = headers.authorization) !== null && _headers$authorizatio !== void 0 && _headers$authorizatio.includes("Bearer"))) {
      throw new _helpers.ApiErrorResponseHelper(_httpStatusCodes.StatusCodes.UNAUTHORIZED, "Unauthorised request! access token is missing", (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.UNAUTHORIZED));
    }
    var user = {
      id: 1,
      name: "Hardy",
      email: "info@mail.com"
    };
    req.entity.user = user;
    next();
  });
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
var _default = exports.default = ApiAuthHelperMiddleware;
//# sourceMappingURL=Auth.middleware.js.map