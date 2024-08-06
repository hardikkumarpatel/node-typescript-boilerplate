"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _helpers = require("../helpers");
var _config = require("../config");
var _2 = require("./");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class SwaggerApp {
  constructor(app) {
    this.app = app;
  }
  initialize() {
    var _this = this;
    return _asyncToGenerator(function* () {
      _this.app.use("/docs", (0, _expressBasicAuth.default)({
        users: {
          root: _config.Config.get(_config.IConfigKey.AUTH_PASSWORD)
        },
        challenge: true
      }));
      _this.app.use("/docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup((0, _swaggerJsdoc.default)(_2.SwaggerOptions.SWAGGER_OPTIONS), {
        explorer: true,
        swaggerOptions: {
          docExpansion: "none"
        }
      }));
      _this.app.get("/docs.json", _helpers.ApiAsyncHelper.AsyncHandler( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (_, res) {
          res.setHeader("Content-Type", "application/json");
          res.send((0, _swaggerJsdoc.default)(_2.SwaggerOptions.SWAGGER_OPTIONS));
        });
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()));
      return "Swagger docs available at http://localhost:".concat(_config.Config.get(_config.IConfigKey.PORT), "/docs \uD83D\uDCD7");
    })();
  }
}
var _default = exports.default = SwaggerApp;
//# sourceMappingURL=Swagger.routes.js.map