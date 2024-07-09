import { Request, Response } from "express";
import StatusCodes, { getReasonPhrase } from "http-status-codes";
import HTTP from "node:http";
import { AddressInfo } from "node:net";
import { ApiErrorResponseHelper, ApiResponseHelper, Log } from "@/helpers";
import { Config, IConfigKey } from "@/config";

class AppHelper {
  public static async serverErrorListening(error: NodeJS.ErrnoException): Promise<void> {
    if (error.syscall !== "listen") {
      throw error;
    }

    switch (error.code) {
      case "EACCES":
        Log.info("Requires privileges");
        return process.exit(1);

      case "EADDRINUSE":
        Log.error(`${Config.get(IConfigKey.PORT)} is already in use`);
        return process.exit(1);

      default:
        throw error;
    }
  }

  public static async serverListening(server: HTTP.Server): Promise<void> {
    const address: AddressInfo = <AddressInfo>server.address();
    Log.info(`Express engine is running on ${address.port} 🚀`);
  }

  public static processEventsListening(HTTP: HTTP.Server): void {
    process
      .on("SIGINT", () => {
        try {
          HTTP.close();
        } catch (SIGINTError: unknown) {
          if (SIGINTError instanceof Error) {
            Log.error(`Error occurred during shutdown server`, SIGINTError);
          }
        } finally {
          Log.info(`Express engine shutdown successfully 🌱`);
          process.exit(1);
        }
      })
      .on("SIGHUP", () => {
        process.kill(process.pid, "SIGTERM");
      })
      .on("uncaughtException", (error: Error) => {
        Log.error(`Uncaught Exception thrown`, error);
        HTTP.close();
        process.exit(1);
      })
      .on("unhandledRejection", (reason: Error) => {
        Log.error(`Unhandled Rejection thrown`, reason);
        HTTP.close();
        process.exit(1);
      });
  }

  public static useAppHealthRoute = (req: Request, res: Response): Response => {
    const { platform, pid } = process;
    return res.status(StatusCodes.OK).json(
      new ApiResponseHelper<Record<string, unknown>>(
        StatusCodes.OK,
        "Welcome to backend! Made in Node with ❤️",
        {
          mode: Config.get<string>(IConfigKey.NODE_ENV),
          platfrom: platform,
          pid: pid
        }
      )
    );
  };

  public static useAppNotFoundRoute = (): void => {
    throw new ApiErrorResponseHelper<string>(
      StatusCodes.NOT_FOUND,
      "Request resource not found",
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  };
}
export default AppHelper;
