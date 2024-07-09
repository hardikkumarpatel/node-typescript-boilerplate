import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookies from "cookie-parser";
import HTTP from "node:http";
import path from "node:path";
import { Log, AppHelper } from "@/helpers";
import { SwaggerApp } from "@/swagger";
import { Config, IConfigKey } from "@/config";
import { ApiErrorHelperMiddleware } from "@/middleware";
import routes from "@/routes";

class ExpressApp {
  public static App: express.Application;
  public static HTTPServer: HTTP.Server;

  public static async run(): Promise<void> {
    ExpressApp.startEngine().catch(Log.error);
    AppHelper.processEventsListening(ExpressApp.HTTPServer);
  }

  public static async startEngine(): Promise<void> {
    ExpressApp.App = express();
    ExpressApp.HTTPServer = HTTP.createServer(this.App);
    ExpressApp.App.set("port", Config.get<number>(IConfigKey.PORT));
    ExpressApp.HTTPServer.on("error", AppHelper.serverErrorListening);
    ExpressApp.HTTPServer.on("close", Log.info);
    ExpressApp.HTTPServer.on("listening", () =>
      AppHelper.serverListening(ExpressApp.HTTPServer).then(ExpressApp.initialize)
    );
    ExpressApp.HTTPServer.listen(Config.get<number>(IConfigKey.PORT));
  }

  private static async initialize(): Promise<void> {
    ExpressApp.initializeMiddleware();
    ExpressApp.initializeRoutes();
    ExpressApp.initializeSwaggerDocs();
    ExpressApp.initializeGlobalMiddleware();
  }

  private static async initializeRoutes(): Promise<void> {
    this.App.use("/health", AppHelper.useAppHealthRoute);
    this.App.use(routes);
  }

  private static async initializeMiddleware(): Promise<void> {
    this.App.use(express.urlencoded({ limit: "6kb", extended: true }));
    this.App.use(express.json({ limit: "6kb" }));
    this.App.use(morgan("combined", { stream: { write: Log.http } }));
    this.App.use("/public", express.static(path.resolve(path.join(__dirname), "src", "public")));
    this.App.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      })
    );
    this.App.use(helmet({ contentSecurityPolicy: false }));
    this.App.use(cookies());
  }

  private static async initializeSwaggerDocs(): Promise<void> {
    if (!Config.isProduction()) {
      new SwaggerApp(ExpressApp.App).initialize().catch(Log.error);
      Log.info(
        `Swagger docs available at http://localhost:${Config.get<number>(IConfigKey.PORT)} 📗`
      );
    }
  }

  private static async initializeGlobalMiddleware(): Promise<void> {
    this.App.use("*", AppHelper.useAppNotFoundRoute);
    this.App.use(ApiErrorHelperMiddleware.useGlobalErrorMiddleware);
  }
}

export default ExpressApp;
