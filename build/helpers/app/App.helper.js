"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatusCodes = _interopRequireWildcard(require("http-status-codes"));
var _ = require("./..");
var _config = require("../../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class AppHelper {
  static serverErrorListening(error) {
    return _asyncToGenerator(function* () {
      if (error.syscall !== "listen") {
        throw error;
      }
      switch (error.code) {
        case "EACCES":
          _.Log.info("Requires privileges");
          return process.exit(1);
        case "EADDRINUSE":
          _.Log.error("".concat(_config.Config.get(_config.IConfigKey.PORT), " is already in use"));
          return process.exit(1);
        default:
          throw error;
      }
    })();
  }
  static serverListening(server) {
    return _asyncToGenerator(function* () {
      var address = server.address();
      _.Log.info("Express engine is running on ".concat(address.port, " \uD83D\uDE80"));
    })();
  }
  static processEventsListening(HTTP) {
    process.on("SIGINT", () => {
      try {
        HTTP.close();
      } catch (SIGINTError) {
        if (SIGINTError instanceof Error) {
          _.Log.error("Error occurred during shutdown server", SIGINTError);
        }
      } finally {
        _.Log.info("Express engine shutdown successfully \uD83C\uDF31");
        process.exit(1);
      }
    }).on("SIGHUP", () => {
      process.kill(process.pid, "SIGTERM");
    }).on("uncaughtException", error => {
      _.Log.error("Uncaught Exception thrown", error);
      HTTP.close();
      process.exit(1);
    }).on("unhandledRejection", reason => {
      _.Log.error("Unhandled Rejection thrown", reason);
      HTTP.close();
      process.exit(1);
    });
  }
}
_defineProperty(AppHelper, "useAppHealthRoute", (req, res) => {
  var {
    platform,
    pid
  } = process;
  return res.status(_httpStatusCodes.default.OK).json(new _.ApiResponseHelper(_httpStatusCodes.default.OK, "Welcome to backend! Made in Node with ❤️", {
    mode: _config.Config.get(_config.IConfigKey.NODE_ENV),
    platfrom: platform,
    pid: pid
  }));
});
_defineProperty(AppHelper, "useAppNotFoundRoute", () => {
  throw new _.ApiErrorResponseHelper(_httpStatusCodes.default.NOT_FOUND, "Request resource not found", (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.default.NOT_FOUND));
});
var _default = exports.default = AppHelper;
//# sourceMappingURL=App.helper.js.map