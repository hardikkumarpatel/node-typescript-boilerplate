"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _nodeHttp = _interopRequireDefault(require("node:http"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _helpers = require("./helpers");
var _swagger = require("./swagger");
var _config2 = require("./config");
var _middleware = require("./middleware");
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class ExpressApp {
  static run() {
    return _asyncToGenerator(function* () {
      ExpressApp.startEngine().then(() => _helpers.AppHelper.processEventsListening(ExpressApp.HTTPServer)).catch(_helpers.Log.error);
    })();
  }
  static startEngine() {
    var _this = this;
    return _asyncToGenerator(function* () {
      ExpressApp.App = (0, _express.default)();
      ExpressApp.HTTPServer = _nodeHttp.default.createServer(_this.App);
      ExpressApp.App.set("port", _config2.Config.get(_config2.IConfigKey.PORT));
      ExpressApp.HTTPServer.on("error", _helpers.AppHelper.serverErrorListening);
      ExpressApp.HTTPServer.on("close", _helpers.Log.info);
      ExpressApp.HTTPServer.on("listening", () => _helpers.AppHelper.serverListening(ExpressApp.HTTPServer).then(ExpressApp.initialize));
      ExpressApp.HTTPServer.listen(_config2.Config.get(_config2.IConfigKey.PORT));
    })();
  }
  static initialize() {
    return _asyncToGenerator(function* () {
      new _helpers.SocketEngineApp(ExpressApp.HTTPServer);
      ExpressApp.App.set("IO", _helpers.SocketEngineApp.IO);
      ExpressApp.initializeMiddleware();
      ExpressApp.setupRequestMiddleware();
      ExpressApp.initializeRoutes();
      ExpressApp.initializeSwaggerDocs();
      ExpressApp.initializeGlobalMiddleware();
    })();
  }
  static initializeMiddleware() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      _this2.App.use(_express.default.urlencoded({
        limit: "6kb",
        extended: true
      }));
      _this2.App.use(_express.default.json({
        limit: "6kb"
      }));
      _this2.App.use((0, _morgan.default)("combined", {
        stream: {
          write: _helpers.Log.http
        }
      }));
      _this2.App.use("/public", _express.default.static(_nodePath.default.resolve(_nodePath.default.join(__dirname), "src", "public")));
      _this2.App.use((0, _cors.default)({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      }));
      _this2.App.use((0, _helmet.default)({
        contentSecurityPolicy: false
      }));
      _this2.App.use((0, _cookieParser.default)());
    })();
  }
  static setupRequestMiddleware() {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      _this3.App.use((req, res, next) => {
        var _req$entity;
        (_req$entity = req.entity) !== null && _req$entity !== void 0 ? _req$entity : req.entity = {};
        next();
      });
    })();
  }
  static initializeRoutes() {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      _this4.App.use("/health", _helpers.AppHelper.useAppHealthRoute);
      _this4.App.use(_routes.default);
    })();
  }
  static initializeSwaggerDocs() {
    return _asyncToGenerator(function* () {
      if (!_config2.Config.isProduction()) {
        new _swagger.SwaggerApp(ExpressApp.App).initialize().catch(_helpers.Log.error);
        _helpers.Log.info("Swagger docs available at http://localhost:".concat(_config2.Config.get(_config2.IConfigKey.PORT), " \uD83D\uDCD7"));
      }
    })();
  }
  static initializeGlobalMiddleware() {
    var _this5 = this;
    return _asyncToGenerator(function* () {
      _this5.App.use("*", _helpers.AppHelper.useAppNotFoundRoute);
      _this5.App.use(_middleware.ApiErrorHelperMiddleware.use);
    })();
  }
}
var _default = exports.default = ExpressApp;
//# sourceMappingURL=app.js.map