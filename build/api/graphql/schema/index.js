"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _glob = require("glob");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GraphQLSchemaDef {
  constructor() {
    var TYPE_DEFINATIONS = _glob.glob.sync(_path.default.resolve(__dirname, "**/*.def.graphql"));
    this.typeDefs = TYPE_DEFINATIONS.map(file => _fs.default.readFileSync(file, "utf-8")).join("\n");
  }
  get() {
    return this.typeDefs;
  }
}
var _default = exports.default = GraphQLSchemaDef;
//# sourceMappingURL=index.js.map