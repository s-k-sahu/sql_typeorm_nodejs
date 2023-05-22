import { Application } from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

import { UserResolver } from "./resolvers";
import configs from "../config/constants";
import { MyContext } from "./resolvers/userResolver";

async function startApolloServer(app: Application) {
  const httpServer = http.createServer(app);
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });
  const server = new ApolloServer<MyContext>({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: configs.PORT }, resolve)
  );
  console.log(
    `🚀 Server is running on http://localhost:${configs.PORT}${server.graphqlPath}`
      .green
  );
}

export default startApolloServer;
