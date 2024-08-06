"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../config");
var _package = require("../../package.json");
var _glob = require("glob");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PORT = _config.Config.get(_config.IConfigKey.PORT);
var API_FILES_PATH = _glob.glob.sync("**/api/rest/**/*.swagger.yaml");
class SwaggerOptions {}
_defineProperty(SwaggerOptions, "SWAGGER_OPTIONS", {
  definition: {
    openapi: "3.1.0",
    host: "",
    basePath: "",
    info: {
      title: "TRIDHYA NODE REST API BOILERPLATE ENGINE",
      version: _package.version,
      description: "Swagger API Documentation for Node Boilerplate Engine",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html"
      },
      contact: {
        name: "Fullstack Team",
        email: "info@email.com"
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Authorization required to access the apis routes",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [{
      url: "http://localhost:".concat(PORT, "/api/v1"),
      description: "development server"
    }, {
      url: "http://stage.api/api/v1",
      description: "staging server"
    }, {
      url: "http://prod.api/api/v1",
      description: "production server"
    }]
  },
  apis: API_FILES_PATH
});
var _default = exports.default = SwaggerOptions;
//# sourceMappingURL=Options.swagger.js.map