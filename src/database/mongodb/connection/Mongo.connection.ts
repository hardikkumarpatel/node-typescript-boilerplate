import { Log } from "@/helpers";
import mongoose from "mongoose";

class MongoDBConnection {
  static async connect() {
    /* eslint-disable no-useless-catch */
    try {
      const connection = await mongoose.connect("");
      (global as any).MongoDB = typeof connection;
      Log.info("Database connected. 🌱");
    } catch (MongoDBConnectionException) {
      throw MongoDBConnectionException;
    }
  }
}

export default MongoDBConnection;
