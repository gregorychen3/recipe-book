import mongoose from "mongoose";
import logger from "../logger";

const MONGODB_URI = process.env.MONGODB_URI || "";

logger.info(`Connecting to mongo at ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (err) => logger.error(`Failed connecting to mongodb: ${err}`));
