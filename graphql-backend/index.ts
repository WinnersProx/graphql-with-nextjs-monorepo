require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

const APP_PORT = 5001;
const APP_URI = `http://localhost:${APP_PORT}`;
const USE_GRAPHQL_PLAYGROUND = true;

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

import { typeDefs } from "./src/config/graphql-schema";
import {
  resolvers,
  IGraphQlSchemaContext,
} from "./src/config/graqhql-resolvers";

const expressServer = express();

expressServer.use(cookieParser("mysecret"));
expressServer.use(bodyParser.urlencoded({ extended: false }));

expressServer.use(
  session({
    cookie: { maxAge: SEVEN_DAYS }, // Requires https: secure: false
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: "mysecret",
  })
);

const apolloServer = new ApolloServer({
  context: ({ req }: { req: any }): IGraphQlSchemaContext => ({
    lang: req.cookies.lang,
    req,
  }),
  introspection: true,
  playground: USE_GRAPHQL_PLAYGROUND,
  typeDefs,
  resolvers,
} as any);

apolloServer.applyMiddleware({
  app: expressServer,
  path: "/graphql",
});

expressServer.listen(APP_PORT, () => {
  console.log(`> App ready on ${APP_URI}`);
  console.log(`> GraphQL ready on ${APP_URI}/graphql`);
  console.log(
    `> GraphQL Playground is${USE_GRAPHQL_PLAYGROUND ? " " : " not "}enabled`
  );
});
