"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));
var _server = require("@apollo/server");
var _config = require("../../config");
var _drainHttpServer = require("@apollo/server/plugin/drainHttpServer");
var _express = require("@apollo/server/express4");
var _schema = _interopRequireDefault(require("./schema"));
var _resolvers = _interopRequireDefault(require("./resolvers"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class GraphQLServer {
  constructor(app) {
    this.app = app;
  }
  initialize(HttpServer) {
    var _this = this;
    return _asyncToGenerator(function* () {
      var graphQLServer = new _server.ApolloServer({
        typeDefs: new _schema.default().get(),
        resolvers: new _resolvers.default().get(),
        nodeEnv: _config.Config.get(_config.IConfigKey.NODE_ENV),
        includeStacktraceInErrorResponses: true,
        plugins: [(0, _drainHttpServer.ApolloServerPluginDrainHttpServer)({
          httpServer: HttpServer
        })]
      });
      yield graphQLServer.start();
      _this.app.set("GraphQL", graphQLServer);
      global.GraphQL = graphQLServer;
      _this.app.use("/graphql", (0, _expressBasicAuth.default)({
        users: {
          root: "deamon"
        },
        challenge: true
      }));
      _this.app.use("/graphql", (0, _express.expressMiddleware)(graphQLServer, {
        context: function () {
          var _context = _asyncToGenerator(function* (_ref) {
            var {
              req
            } = _ref;
            return {
              token: req.headers.token
            };
          });
          function context(_x) {
            return _context.apply(this, arguments);
          }
          return context;
        }()
      }));
      return "GraphQL server is running at http://localhost:".concat(_config.Config.get(_config.IConfigKey.PORT), "/graphql \uD83D\uDE80");
    })();
  }
}
var _default = exports.default = GraphQLServer;
//# sourceMappingURL=Graphql.server.js.map