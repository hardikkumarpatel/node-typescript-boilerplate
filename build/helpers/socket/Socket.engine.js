"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _socket = require("socket.io");
var _ = require("./..");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class SocketAppHelper {
  constructor(http) {
    this.IO = new _socket.Server(http, {
      cors: {
        origin: "*"
      },
      connectionStateRecovery: {},
      allowEIO3: true
    });
    global.IO = this.IO;
  }
  initialize() {
    var _this = this;
    return _asyncToGenerator(function* () {
      _.Log.info("Socket engine connected and initialized \uD83D\uDE80");
      _this.IO.on("connection", /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (socket) {
          try {
            _.Log.info("Socket is connected ".concat(socket.id));
            socket.on("disconnect", reason => {
              _.Log.error("socket ".concat(socket.id, " disconnected due to"), reason);
            });
          } catch (SocketException) {
            if (SocketException instanceof Error) {
              _.Log.error("Error ocurred in socket app", SocketException);
            }
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }
  static emitSocketEvents(req, room, event, payload) {
    return _asyncToGenerator(function* () {
      var IO = req.app.get("IO");
      IO.in(room).emit(event, payload);
    })();
  }
  static acknowledgment(callback) {
    if (callback && typeof callback === "function") {
      callback({
        status: "OK"
      });
    }
  }
}
var _default = exports.default = SocketAppHelper;
//# sourceMappingURL=Socket.engine.js.map