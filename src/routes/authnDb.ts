import mkdirp from "mkdirp";
import sqlite3 from "sqlite3";

mkdirp.sync("./var/db");

export const authnDb = new sqlite3.Database("./var/db/todos.db");

authnDb.serialize(function () {
  authnDb.run(
    "CREATE TABLE IF NOT EXISTS users ( \
    id TEXT PRIMARY KEY, \
    name TEXT \
  )"
  );
});
