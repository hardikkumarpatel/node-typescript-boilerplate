import UserMutationResolver from "./User/User.mutation";
import UserQueryResolver from "./User/User.query";
class GraphQLSchemaResolvers {
  public get() {
    return {
      Query: {
        ...new UserQueryResolver().Query
      },
      Mutation: {
        ...new UserMutationResolver().Mutation
      }
    };
  }
}

export default GraphQLSchemaResolvers;
