"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../utils");
var winston = _interopRequireWildcard(require("winston"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class LoggerHelper {
  static print() {
    return winston.createLogger({
      level: process.env.LOG_LEVEL,
      levels: winston.config.npm.levels,
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize({
        level: true,
        message: true,
        colors: {
          error: "red",
          info: "green",
          debug: "green",
          warn: "yellow",
          http: "blue"
        }
      }), winston.format.timestamp({
        format: (0, _utils.date)()
      }), winston.format.simple(), winston.format.printf(info => {
        var printMessage = "[".concat(info.timestamp, "] [").concat(info.level, "]: ").concat(info.message);
        if (info.metadata) {
          if (info.metadata instanceof Error) {
            var {
              message: _message,
              stack
            } = info.metadata;
            var errorMessage = JSON.stringify({
              message: _message,
              stack
            }, null, 2);
            return "".concat(printMessage, " | ").concat(errorMessage);
          }
          if (typeof info.metadata === "object") {
            var _message2 = JSON.stringify(info.metadata, null, 2);
            return "".concat(printMessage, " | ").concat(_message2);
          }
          if (typeof info.metadata === "number") {
            return "".concat(printMessage, " | ").concat(info.metadata);
          }
          return "".concat(printMessage, " | ").concat(info.metadata);
        }
        return printMessage;
      }))
    });
  }
  static info(message, metadata) {
    LoggerHelper.print().info(message, {
      metadata
    });
  }
  static debug(message, metadata) {
    LoggerHelper.print().debug(message, {
      metadata
    });
  }
  static error(message, metadata) {
    LoggerHelper.print().error(message, {
      metadata
    });
  }
  static warn(message, metadata) {
    LoggerHelper.print().warn(message, {
      metadata
    });
  }
  static http(message) {
    LoggerHelper.print().http(message);
  }
}
var _default = exports.default = LoggerHelper;
//# sourceMappingURL=Logger.helper.js.map