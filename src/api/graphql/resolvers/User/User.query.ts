class UserQueryResolver {
  public Query: {
    getUsers: (
      parent: unknown,
      args: Record<string, unknown>,
      contextValue: Record<string, unknown>,
      info: Record<string, unknown>
    ) => Promise<void>;
  };
  constructor() {
    this.Query = {
      getUsers: this.getUsers.bind(this)
    };
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  private async getUsers(
    parent: unknown,
    args: Record<string, unknown>,
    contextValue: Record<string, unknown>,
    info: Record<string, unknown>
  ): Promise<any> {
    return {
      id: 1,
      name: "Hardik"
    };
  }
}

export default UserQueryResolver;
