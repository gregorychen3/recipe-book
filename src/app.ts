import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import path from "path";
import { logger } from "./logger";
import { authRouter } from "./routes/auth";
import { recipeRouter } from "./routes/recipe";
import { testRouter } from "./routes/test";

import "./db/db"; // for side effect of initializing db conn

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"));
app.use(express.json());

// serve ui static files
const uiStaticAssetsPath = path.join(__dirname, "/../ui/build");
app.use(express.static(uiStaticAssetsPath));
logger.info(`Serving UI static assets from ${uiStaticAssetsPath}`);

app.use("/", authRouter);

app.use("/test/", testRouter);
app.use("/api/recipes", recipeRouter);

// catchall: send UI index.html file.
app.get("/*", (req, res) => {
  const file = path.join(__dirname, "/../ui/build/", "index.html");
  res.sendFile(file);
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status ?? 500);
  return res.send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`);
});
