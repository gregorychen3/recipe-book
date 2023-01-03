import sqlite3 from "sqlite3";
import mkdirp from "mkdirp";
import crypto from "crypto";

mkdirp.sync("./var/db");

var db = new sqlite3.Database("./var/db/todos.db");

db.serialize(function () {
  // create the database schema for the todos app
  db.run(
    "CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )"
  );

  // create an initial user (username: alice, password: letmein)
  var salt = crypto.randomBytes(16);
  db.run(
    "INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
    ["alice", crypto.pbkdf2Sync("letmein", salt, 310000, 32, "sha256"), salt]
  );
});

module.exports = db;
