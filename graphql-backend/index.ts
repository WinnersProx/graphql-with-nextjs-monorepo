require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import passport from "./src/config/passport";
import cors from 'cors';

import {
  APP_PORT,
  APP_URI,
  SEVEN_DAYS,
  USE_GRAPHQL_PLAYGROUND,
} from "./src/config/constants";

import { typeDefs } from "./src/config/graphql-schema";
import {
  resolvers,
  IGraphQlSchemaContext,
} from "./src/config/graqhql-resolvers";
import routes from "./src/routes";
import extractJwtFromCookie from "./src/middlewares/extract-jwt-from-cookie";
import corsOptions from "./src/config/cors";

const expressServer = express();

expressServer.use(cors(corsOptions));

expressServer.use(cookieParser("mysecret"));
expressServer.use(bodyParser.urlencoded({ extended: false }));
expressServer.use(bodyParser.json());
expressServer.use(passport.initialize());


expressServer.use(routes);



expressServer.use(
  session({
    cookie: { maxAge: SEVEN_DAYS }, // Requires https: secure: false
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: "mysecret",
  })
);

expressServer.use(extractJwtFromCookie);

const apolloServer = new ApolloServer({
  context: ({ req }: { req: any }): IGraphQlSchemaContext => ({
    lang: req.cookies.lang,
    req,
    user: req.user,
  }),
  introspection: true,
  playground: USE_GRAPHQL_PLAYGROUND,
  typeDefs,
  resolvers,
} as any);

apolloServer.applyMiddleware({
  cors: corsOptions,
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
