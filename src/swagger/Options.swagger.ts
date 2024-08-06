import { Config, IConfigKey } from "@/config";
import { version } from "../../package.json";
import swaggerJSDocs from "swagger-jsdoc";
import { glob } from "glob";

export type Options = swaggerJSDocs.Options;
const PORT = Config.get<number>(IConfigKey.PORT);
const API_FILES_PATH = glob.sync("**/api/rest/**/*.swagger.yaml");
class SwaggerOptions {
  public static readonly SWAGGER_OPTIONS: Options = {
    definition: {
      openapi: "3.1.0",
      host: "",
      basePath: "",
      info: {
        title: "TRIDHYA NODE REST API BOILERPLATE ENGINE",
        version,
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
      security: [
        {
          bearerAuth: []
        }
      ],
      servers: [
        {
          url: `http://localhost:${PORT}/api/v1`,
          description: "development server"
        },
        {
          url: `http://stage.api/api/v1`,
          description: "staging server"
        },
        {
          url: `http://prod.api/api/v1`,
          description: "production server"
        }
      ]
    },
    apis: API_FILES_PATH
  };
}

export default SwaggerOptions;
