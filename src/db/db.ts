import { Client } from "pg";
import { logger } from "../logger";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://localhost/recipe";

logger.info(`Connecting to postgres`);

export const db = new Client({
  connectionString: DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "development"
      ? undefined
      : { rejectUnauthorized: false },
});

db.connect();
