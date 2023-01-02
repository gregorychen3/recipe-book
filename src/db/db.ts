import logger from "../logger";
import { Pool, Client } from "pg";

const PG_CONN_STR = process.env.PG_CONN_STR || "";

logger.info(`Connecting to postgres`);

const pgClient = new Client({
  connectionString: PG_CONN_STR,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = mongoose.connection;
db.on("error", (err) => logger.error(`Failed connecting to mongodb: ${err}`));
