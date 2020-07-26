import express from "express";
import morgan from "morgan";
import testController from "./controllers/testController";
import logger from "./logger";
import recipeController from "./controllers/recipeController";
import "./db/db"; // for side effect of initializing db conn

const server = express();

server.use(morgan("dev"));

server.use("/test/", testController);
server.use("/api/recipes", recipeController);

server.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`);
});
