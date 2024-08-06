class UserMutationResolver {
  public Mutation: { updateUsers: () => Promise<void> };
  constructor() {
    this.Mutation = {
      updateUsers: this.updateUsers.bind(this)
    };
  }

  private async updateUsers(): Promise<void> {
    /** DO NOTHING NOW */
  }
}
export default UserMutationResolver;
