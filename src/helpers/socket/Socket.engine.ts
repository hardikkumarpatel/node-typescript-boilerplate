import HTTP from "node:http";
import { Request } from "express";
import { DisconnectReason, Server, Socket } from "socket.io";
import { Log } from "@/helpers";

class SocketAppHelper {
  public static IO: Server;
  constructor(http: HTTP.Server) {
    SocketAppHelper.IO = new Server(http, {
      cors: {
        origin: "*"
      },
      connectionStateRecovery: {},
      allowEIO3: true
    });
    SocketAppHelper.intiSocket();
  }

  public static async intiSocket(): Promise<void> {
    Log.info(`Socket engine connected and initialized 🚀`);
    SocketAppHelper.IO.on("connection", async (socket: Socket) => {
      try {
        Log.info(`Socket is connected ${socket.id}`);

        socket.on("disconnect", (reason: DisconnectReason) => {
          Log.error<string>(`socket ${socket.id} disconnected due to`, reason);
        });
      } catch (SocketException: unknown) {
        if (SocketException instanceof Error) {
          Log.error<Error>("Error ocurred in socket app", SocketException);
        }
      }
    });
  }

  public static async emitSocketEvents<T>(
    req: Request,
    room: string,
    event: string,
    payload: T
  ): Promise<void> {
    const IO: Server = req.app.get("IO");
    IO.in(room).emit(event, payload);
  }

  public static acknowledgment(callback?: (response: { status: string }) => void): void {
    if (callback && typeof callback === "function") {
      callback({ status: "OK" });
    }
  }
}

export default SocketAppHelper;
