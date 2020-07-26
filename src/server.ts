import express from "express";
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

server.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`);
});
