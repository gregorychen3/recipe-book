import { Client } from "pg";
import logger from "../logger";

const PG_CONN_STR = process.env.PG_CONN_STR || "";

logger.info(`Connecting to postgres`);

export const db = new Client({
  connectionString: PG_CONN_STR,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();
