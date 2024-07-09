import express from "express";
import basicAuth from "express-basic-auth";
import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { ApiAsyncHelper } from "@/helpers";
import { Config, IConfigKey } from "@/config";
import { SwaggerOptions } from "@/swagger";

class SwaggerApp {
  public app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  public async initialize(): Promise<void> {
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
  }
}

export default SwaggerApp;
