import mongoose from "mongoose";
import logger from "src/logger";

const MONGODB_URI = process.env.MONGODB_URI || "";

export const initDbConn = () => {
  logger.info(`Connecting to mongo at ${MONGODB_URI}`);
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (err) {
      logger.error("Failed to connect to mongo", err);
      process.exit(1);
    }
  });
};
