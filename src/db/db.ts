import { Client } from "pg";
import logger from "../logger";

const DATABASE_URL = process.env.DATABASE_URL || "";

logger.info(`Connecting to postgres`);

export const db = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();
