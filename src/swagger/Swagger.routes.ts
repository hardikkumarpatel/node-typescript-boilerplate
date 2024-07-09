import express from "express";
import basicAuth from "express-basic-auth";
import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerOptions from "@/swagger/Options.swagger";
import { ApiAsyncHelper } from "@/helpers";
import { Config, IConfigKey } from "@/config";

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
      swaggerUi.setup(swaggerJSDocs(swaggerOptions), {
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
        res.send(swaggerJSDocs(swaggerOptions));
      })
    );
  }
}

export default SwaggerApp;
