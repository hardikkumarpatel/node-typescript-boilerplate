import { glob } from "glob";
import fs from "fs";
import path from "path";
class GraphQLSchemaDef {
  private typeDefs: string;
  constructor() {
    const TYPE_DEFINATIONS = glob.sync(path.resolve(__dirname, "**/*.def.graphql"));
    this.typeDefs = TYPE_DEFINATIONS.map((file) => fs.readFileSync(file, "utf-8")).join("\n");
  }

  public get(): string {
    return this.typeDefs;
  }
}

export default GraphQLSchemaDef;
