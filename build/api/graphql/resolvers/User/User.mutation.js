"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class UserMutationResolver {
  constructor() {
    this.Mutation = {
      updateUsers: this.updateUsers.bind(this)
    };
  }
  updateUsers() {
    return _asyncToGenerator(function* () {})();
  }
}
var _default = exports.default = UserMutationResolver;
//# sourceMappingURL=User.mutation.js.map