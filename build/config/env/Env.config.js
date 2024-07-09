"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IConfigKey = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IConfigKey = exports.IConfigKey = /*#__PURE__*/function (IConfigKey) {
  IConfigKey["NODE_ENV"] = "NODE_ENV";
  IConfigKey["PORT"] = "PORT";
  IConfigKey["DB_HOST"] = "DB_HOST";
  IConfigKey["DB_USER"] = "DB_USER";
  IConfigKey["DB_PASS"] = "DB_PASS";
  IConfigKey["DB_NAME"] = "DB_NAME";
  IConfigKey["DB_DIALECT"] = "DB_DIALECT";
  IConfigKey["DB_PORT"] = "DB_PORT";
  IConfigKey["LOG_LEVEL"] = "LOG_LEVEL";
  IConfigKey["AUTH_PASSWORD"] = "AUTH_PASSWORD";
  return IConfigKey;
}({});
class Config {
  constructor() {
    _defineProperty(this, "config", new Map());
    this.load();
  }
  load() {
    Object.keys(process.env).forEach(key => this.config.set(key, process.env[key]));
  }
  get(key) {
    return this.config.get(key);
  }
  isProduction() {
    return this.get(IConfigKey.NODE_ENV) === "production";
  }
  isStaging() {
    return this.get(IConfigKey.NODE_ENV) === "staging";
  }
  isDev() {
    return !this.isProduction() && !this.isStaging();
  }
}
var _default = exports.default = new Config();
//# sourceMappingURL=Env.config.js.map