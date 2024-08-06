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
var _Graphql = _interopRequireDefault(require("./api/graphql/Graphql.server"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class ExpressApp {
  static run() {
    return _asyncToGenerator(function* () {
      ExpressApp.startEngine().then(_helpers.AppHelper.signalListening).catch(_helpers.Log.error);
    })();
  }
  static startEngine() {
    return _asyncToGenerator(function* () {
      ExpressApp.App = (0, _express.default)();
      ExpressApp.HttpServer = _nodeHttp.default.createServer(ExpressApp.App);
      ExpressApp.App.set("HttpServer", ExpressApp.HttpServer);
      ExpressApp.App.set("port", _config2.Config.get(_config2.IConfigKey.PORT));
      ExpressApp.HttpServer.on("error", _helpers.AppHelper.serverErrorListening);
      ExpressApp.HttpServer.on("close", _helpers.Log.info);
      ExpressApp.HttpServer.on("listening", () => _helpers.AppHelper.listening(ExpressApp.HttpServer).then(ExpressApp.initialize));
      ExpressApp.HttpServer.listen(_config2.Config.get(_config2.IConfigKey.PORT));
      return ExpressApp.App;
    })();
  }
  static initialize() {
    return _asyncToGenerator(function* () {
      yield ExpressApp.initializeMiddleware();
      yield ExpressApp.setupRequestMiddleware();
      yield ExpressApp.initializeRoutes();
      yield ExpressApp.initializeSwaggerDocs();
      yield ExpressApp.initializeSocket();
      yield ExpressApp.initializeGraphQLServer();
      yield ExpressApp.initializeGlobalMiddleware();
    })();
  }
  static initializeMiddleware() {
    var _this = this;
    return _asyncToGenerator(function* () {
      _this.App.use(_express.default.urlencoded({
        limit: "6kb",
        extended: true
      }));
      _this.App.use(_express.default.json({
        limit: "6kb"
      }));
      _this.App.use((0, _morgan.default)("combined", {
        stream: {
          write: _helpers.Log.http
        }
      }));
      _this.App.use("/public", _express.default.static(_nodePath.default.resolve(_nodePath.default.join(__dirname, "public"))));
      _this.App.use((0, _cors.default)({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      }));
      _this.App.use((0, _helmet.default)({
        contentSecurityPolicy: false
      }));
      _this.App.use((0, _cookieParser.default)());
    })();
  }
  static setupRequestMiddleware() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      _this2.App.use((req, res, next) => {
        var _req$entity;
        (_req$entity = req.entity) !== null && _req$entity !== void 0 ? _req$entity : req.entity = {};
        next();
      });
    })();
  }
  static initializeRoutes() {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      _this3.App.use("/health", _helpers.AppHelper.useAppHealthRoute);
      _this3.App.use(_routes.default);
    })();
  }
  static initializeSwaggerDocs() {
    return _asyncToGenerator(function* () {
      var swaggerApp = new _swagger.SwaggerApp(ExpressApp.App);
      yield swaggerApp.initialize().then(_helpers.Log.info).catch(_helpers.Log.error);
    })();
  }
  static initializeSocket() {
    return _asyncToGenerator(function* () {
      var socket = new _helpers.SocketAppHelper(ExpressApp.HttpServer);
      yield socket.initialize();
      global.IO = socket.IO;
      ExpressApp.App.set("IO", socket.IO);
    })();
  }
  static initializeGraphQLServer() {
    return _asyncToGenerator(function* () {
      if (!_config2.Config.isProduction()) {
        var graphQL = new _Graphql.default(ExpressApp.App);
        yield graphQL.initialize(ExpressApp.HttpServer).then(_helpers.Log.info).catch(_helpers.Log.error);
      }
    })();
  }
  static initializeGlobalMiddleware() {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      _this4.App.use("*", _helpers.AppHelper.useAppNotFoundRoute);
      _this4.App.use(_middleware.ApiErrorHelperMiddleware.use);
    })();
  }
}
var _default = exports.default = ExpressApp;
//# sourceMappingURL=app.js.map