export enum IConfigKey {
  NODE_ENV = "NODE_ENV",
  PORT = "PORT",
  DB_HOST = "DB_HOST",
  DB_USER = "DB_USER",
  DB_PASS = "DB_PASS",
  DB_NAME = "DB_NAME",
  DB_DIALECT = "DB_DIALECT",
  DB_PORT = "DB_PORT",
  LOG_LEVEL = "LOG_LEVEL",
  AUTH_PASSWORD = "AUTH_PASSWORD"
}

class Config {
  private config = new Map<string, any>();
  constructor() {
    this.load();
  }

  private load(): void {
    Object.keys(process.env).forEach((key) => this.config.set(key, process.env[key]));
  }

  public get<T>(key: IConfigKey): T {
    return this.config.get(key);
  }

  public isProduction(): boolean {
    return this.get(IConfigKey.NODE_ENV) === "production";
  }

  public isStaging(): boolean {
    return this.get(IConfigKey.NODE_ENV) === "staging";
  }

  public isDev(): boolean {
    return !this.isProduction() && !this.isStaging();
  }
}

export default new Config();
