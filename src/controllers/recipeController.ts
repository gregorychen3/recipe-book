import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IRecipeModel, Recipe } from "../db/recipe";
import { recipeValidation } from "../middlewares/validation";

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

recipeController.post("/", recipeValidation, async (req: Request, res: Response) => {
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

recipeController.post("/:id", recipeValidation, async (req: Request, res: Response) => {
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

recipeController.delete("/:id", async (req, res) => {
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
});

export default recipeController;
