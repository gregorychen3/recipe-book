import express from "express";
import logger from "./logger";
import morgan from "morgan";

const server = express();

server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`);
});
