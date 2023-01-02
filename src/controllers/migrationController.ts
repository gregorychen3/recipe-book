import express from "express";
import logger from "../logger";
const { MongoClient } = require("mongodb");
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

const migrationController = express.Router();

migrationController.get(
  "/",
  /*auth,*/ async (_, res) => {
    logger.info(`1`);
    const insertQ = "INSERT INTO recipe(id, body) VALUES($1, $2) RETURNING *";

    const pgdburl =
      "postgres://txlwfrblsnymrh:be0b38b28da1400dc6178fd3da5d79f1c1af197593029f4a6cede5d838d154a7@ec2-34-197-84-74.compute-1.amazonaws.com:5432/dd0hh4sp8fvbep";
    const pgClient = new Client({
      connectionString: pgdburl,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const mongoUrl =
      "mongodb+srv://gregorychen3:iloveEden2020!m@cluster-n22h8djp.xxzy7.mongodb.net/heroku_n22h8djp?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(mongoUrl);

    logger.info(`2`);
    console.log("main");
    await mongoClient.connect();
    await pgClient.connect();
    console.log("connected");

    logger.info(`3`);
    const dbName = "heroku_n22h8djp";
    const db = mongoClient.db(dbName);
    const collection = db.collection("recipes");
    const results = await collection.find({}).toArray();
    const recipes = JSON.parse(JSON.stringify(results));
    logger.info(`4`);
    const migrated = recipes.map((r: any) => {
      r.id = uuidv4();
      delete r._id;

      r.lastUpdatedAt = new Date().toISOString();
      delete r.__v;

      r.ingredients = r.ingredients.map((i: any) => {
        delete i._id;
        return i;
      });

      r.tags = {
        cuisine: r.cuisine,
        course: r.course,
      };

      delete r.cuisine;
      delete r.course;

      return r;
    });

    logger.info(`5`);
    for (let i = 0; i < migrated.length; i++) {
      const r = migrated[i];
      pgClient
        .query(insertQ, [r.id, JSON.stringify(r)])
        //.then((res) => console.log(res.rows[0]))
        .catch((e: any) => console.error(e.stack));
    }

    logger.info(`6`);

    return res.send({ status: 200 });
  }
);

export default migrationController;
