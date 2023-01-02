import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IRecipeModel, Recipe } from "../db/recipe";
import logger from "../logger";
import { recipeValidation } from "../middlewares/recipeValidation";
const { MongoClient } = require("mongodb");
const { Client } = require("pg");

const recipeController = express.Router();

recipeController.get("/", async (_, res) => {
  const recipes = await Recipe.find();
  return res.send(recipes);
});

recipeController.get("/:id", async (req, res) => {
  var recipe: IRecipeModel | null;
  try {
    recipe = await Recipe.findOne({ _id: req.params.id });
  } catch (e) {
    return res.status(400).send(e.message);
  }
  return recipe ? res.send(recipe) : res.sendStatus(404);
});

recipeController.post("/", /*auth,*/ recipeValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { name, course, cuisine, servings, ingredients, instructions, sources } = req.body;

  const recipe = new Recipe({
    name,
    course,
    cuisine,
    servings,
    ingredients,
    instructions,
    sources,
  });

  try {
    const newRecipe = await recipe.save();
    return res.send(newRecipe);
  } catch (e) {
    return res.status(500).send({ errors: errors.array({ onlyFirstError: true }) });
  }
});

recipeController.post("/:id", /*auth,*/ recipeValidation, async (req: Request, res: Response) => {
  let recipe: IRecipeModel | null;
  try {
    recipe = await Recipe.findOne({ _id: req.params.id }).exec();
  } catch (e) {
    return res.status(400).send(e.message);
  }
  if (!recipe) {
    return res.sendStatus(404);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { name, course, cuisine, servings, ingredients, instructions, sources } = req.body;

  recipe.name = name;
  recipe.course = course;
  recipe.cuisine = cuisine;
  recipe.servings = servings;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;
  recipe.sources = sources;

  const updatedRecipe = await recipe.save();
  return res.send(updatedRecipe);
});

recipeController.delete(
  "/:id",
  /*auth,*/ async (req, res) => {
    let recipe: IRecipeModel | null;
    try {
      recipe = await Recipe.findOne({ _id: req.params.id });
    } catch (e) {
      return res.status(400).send(e.message);
    }
    if (!recipe) {
      return res.sendStatus(404);
    }

    const deleted = await recipe.remove();
    return res.send({ id: deleted.id });
  }
);

recipeController.get(
  "/migrate",
  /*auth,*/ async (_, res) => {
    logger.info(`1`);
    const insertQ = "INSERT INTO recipe(id, body) VALUES(gen_random_uuid(), $1) RETURNING *";

    const pgdburl =
      "postgres://txlwfrblsnymrh:be0b38b28da1400dc6178fd3da5d79f1c1af197593029f4a6cede5d838d154a7@ec2-34-197-84-74.compute-1.amazonaws.com:5432/dd0hh4sp8fvbep";
    const pgClient = new Client({ connectionString: pgdburl });

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
      r.id = r._id;
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
        .query(insertQ, [JSON.stringify(r)])
        //.then((res) => console.log(res.rows[0]))
        .catch((e: any) => console.error(e.stack));
    }

    logger.info(`6`);

    return res.send({ status: 200 });
  }
);

export default recipeController;
