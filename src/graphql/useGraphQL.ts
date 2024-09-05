import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { loadFiles } from "@graphql-tools/load-files";
import type { Express } from "express";

import { resolvers } from "./resolvers";

export const useGraphQL = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs: [
      ...(await loadFiles("./src/graphql/schema.graphql")),
    ],
    resolvers,
  });

  await server.start();

  app.use(expressMiddleware(server));
}
