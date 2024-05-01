import { ApolloServer } from "apollo-server-micro";
import { getConnection } from "../src/database";

import resolvers from "../src/graphql/resolvers";
import typeDefs from "../src/graphql/schema";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await getConnection();

    return { dbConn };
  },
  introspection: true,
});

export default apolloServer.createHandler({ path: "/api/graphql" });
