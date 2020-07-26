import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Recipe } from "../db/recipe";
import { recipeValidation } from "../middlewares/validation";

const recipeController = express.Router();

recipeController.get("/", async (_, res) => {
  const recipes = await Recipe.find();
  return res.send(recipes);
});

recipeController.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    return res.send(recipe);
  } catch (_) {
    return res.sendStatus(404);
  }
});

recipeController.post(
  "/",
  recipeValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ errors: errors.array({ onlyFirstError: true }) });
    }

    const {
      name,
      course,
      cuisine,
      servings,
      ingredients,
      instructions,
      sources,
    } = req.body;

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
      return res
        .status(500)
        .send({ errors: errors.array({ onlyFirstError: true }) });
    }
  }
);

recipeController.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`update recipe ${id}`);
});

recipeController.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`delete recipe ${id}`);
});

export default recipeController;
