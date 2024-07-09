"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../config");
var _package = require("../../package.json");
var PORT = _config.Config.get(_config.IConfigKey.PORT);
var swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    host: "",
    basePath: "",
    info: {
      title: "TRIDHYA NODE BOILERPLATE ENGINE",
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
  apis: ["./src/routes/**/*.js"]
};
var _default = exports.default = swaggerOptions;
//# sourceMappingURL=Options.swagger.js.map