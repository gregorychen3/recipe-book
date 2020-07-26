import express, { Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import recipeController from "./controllers/recipeController";
import testController from "./controllers/testController";
import "./db/db"; // for side effect of initializing db conn
import logger from "./logger";

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use("/test/", testController);
server.use("/api/recipes", recipeController);

// catch 404 and forward to error handler
server.use((req, res, next) => next(createError(404)));

// error handler
server.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.sendStatus(err.status ? err.status : 500);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`);
});
