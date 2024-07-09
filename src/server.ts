import ExpressApp from "@/app";
import { Log } from "@/helpers";

class Server {
  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    ExpressApp.run().catch(Log.error);
  }
}

export default new Server();
