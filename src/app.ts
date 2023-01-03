import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { logger } from "./logger";
import { authnRouter } from "./routes/authn";
import { recipeRouter } from "./routes/recipe";
import { testRouter } from "./routes/test";
import { uiRouter } from "./routes/ui";

import "./db/db"; // for side effect of initializing db conn

var SQLiteStore = require("connect-sqlite3")(session);

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"));
app.use(express.json());

app.use("/test/", testRouter);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));

app.use("/authn", authnRouter);

app.use("/", uiRouter);

app.use("/api/recipes", recipeRouter);

// catchall: send UI index.html file.
app.get("/*", (_, res) => {
  const file = path.join(__dirname, "/../ui/build/", "index.html");
  res.sendFile(file);
});

// catch 404 and forward to error handler
app.use((_, __, next) => next(createError(404)));

// error handler
app.use((err: HttpError, req: Request, res: Response, _: NextFunction) => {
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
