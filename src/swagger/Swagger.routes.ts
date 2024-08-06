import express from "express";
import basicAuth from "express-basic-auth";
import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { ApiAsyncHelper } from "@/helpers";
import { Config, IConfigKey } from "@/config";
import { SwaggerOptions } from "@/swagger";

class SwaggerApp {
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  public async initialize(): Promise<string> {
    this.app.use(
      "/docs",
      basicAuth({
        users: {
          root: Config.get<string>(IConfigKey.AUTH_PASSWORD)
        },
        challenge: true
      })
    );
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJSDocs(SwaggerOptions.SWAGGER_OPTIONS), {
        explorer: true,
        swaggerOptions: {
          docExpansion: "none"
        }
      })
    );
    this.app.get(
      "/docs.json",
      ApiAsyncHelper.AsyncHandler(async (_, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerJSDocs(SwaggerOptions.SWAGGER_OPTIONS));
      })
    );
    return `Swagger docs available at http://localhost:${Config.get<number>(IConfigKey.PORT)}/docs 📗`;
  }
}

export default SwaggerApp;
