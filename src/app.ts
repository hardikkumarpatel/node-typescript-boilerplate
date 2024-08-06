import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookies from "cookie-parser";
import HTTP from "node:http";
import path from "node:path";
import { Log, AppHelper, SocketAppHelper } from "@/helpers";
import { SwaggerApp } from "@/swagger";
import { Config, IConfigKey } from "@/config";
import { ApiErrorHelperMiddleware } from "@/middleware";
import GraphQLServer from "@/api/graphql/Graphql.server";
import routes from "@/routes";

class ExpressApp {
  public static App: express.Application;
  public static HttpServer: HTTP.Server;

  public static async run(): Promise<void> {
    ExpressApp.startEngine().then(AppHelper.signalListening).catch(Log.error);
  }

  public static async startEngine(): Promise<express.Application> {
    ExpressApp.App = express();
    ExpressApp.HttpServer = HTTP.createServer(ExpressApp.App);
    ExpressApp.App.set("HttpServer", ExpressApp.HttpServer);
    ExpressApp.App.set("port", Config.get<number>(IConfigKey.PORT));
    ExpressApp.HttpServer.on("error", AppHelper.serverErrorListening);
    ExpressApp.HttpServer.on("close", Log.info);
    ExpressApp.HttpServer.on("listening", () =>
      AppHelper.listening(ExpressApp.HttpServer).then(ExpressApp.initialize)
    );
    ExpressApp.HttpServer.listen(Config.get<number>(IConfigKey.PORT));
    return ExpressApp.App;
  }

  private static async initialize(): Promise<void> {
    await ExpressApp.initializeMiddleware();
    await ExpressApp.setupRequestMiddleware();
    await ExpressApp.initializeRoutes();
    await ExpressApp.initializeSwaggerDocs();
    await ExpressApp.initializeSocket();
    await ExpressApp.initializeGraphQLServer();
    await ExpressApp.initializeGlobalMiddleware();
  }

  private static async initializeMiddleware(): Promise<void> {
    this.App.use(express.urlencoded({ limit: "6kb", extended: true }));
    this.App.use(express.json({ limit: "6kb" }));
    this.App.use(morgan("combined", { stream: { write: Log.http } }));
    this.App.use("/public", express.static(path.resolve(path.join(__dirname, "public"))));
    this.App.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      })
    );
    this.App.use(helmet({ contentSecurityPolicy: false }));
    this.App.use(cookies());
  }

  private static async setupRequestMiddleware(): Promise<void> {
    this.App.use((req: Request, res: Response, next: NextFunction) => {
      req.entity ??= {};
      next();
    });
  }

  private static async initializeRoutes(): Promise<void> {
    this.App.use("/health", AppHelper.useAppHealthRoute);
    this.App.use(routes);
  }

  private static async initializeSwaggerDocs(): Promise<void> {
    const swaggerApp = new SwaggerApp(ExpressApp.App);
    await swaggerApp.initialize().then(Log.info).catch(Log.error);
  }

  private static async initializeSocket(): Promise<void> {
    const socket = new SocketAppHelper(ExpressApp.HttpServer);
    await socket.initialize();
    (global as any).IO = socket.IO;
    ExpressApp.App.set("IO", socket.IO);
  }

  private static async initializeGraphQLServer(): Promise<void> {
    const graphQL = new GraphQLServer(ExpressApp.App);
    await graphQL.initialize(ExpressApp.HttpServer).then(Log.info).catch(Log.error);
  }

  private static async initializeGlobalMiddleware(): Promise<void> {
    this.App.use("*", AppHelper.useAppNotFoundRoute);
    this.App.use(ApiErrorHelperMiddleware.use);
  }
}

export default ExpressApp;
