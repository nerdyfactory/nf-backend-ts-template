/*
 * @format
 */
import createError from "http-errors";
import express from "express";
import logger from "morgan";
import cors from "cors";

import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers, context } from "src/resolvers";

import routes from "src/routes";
const { NODE_ENV } = process.env;
const GRAPHQLPATH = "/api/graphql";
const isProduction = NODE_ENV === "production";

const app = express();

app.use(express.json());

if (!isProduction) {
  app.use(logger("dev"));
  app.use(
    cors({
      origin: "*",
    })
  );
}

const server = new ApolloServer({
  playground: !isProduction,
  typeDefs,
  resolvers,
  context,
});

server.applyMiddleware({ app, path: GRAPHQLPATH });

app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: createError.HttpError,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isProduction ? {} : err;

    // render the error page
    res.status(err.status || 500);
    res.json({
      message: err.message,
    });
  }
);

export default app;
