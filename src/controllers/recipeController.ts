import express from "express";
import { Recipe } from "../db/recipe";

const recipeController = express.Router();

recipeController.get("/", async (_, res) => {
  const recipes = await Recipe.find();
  return res.send(recipes);
});

recipeController.get("/:id", (req, res) => {
  const { id } = req.params;
  return res.send(`get recipe ${id}`);
});

recipeController.post("/", (req, res) => {
  res.send("create recipe");
});

recipeController.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`update recipe ${id}`);
});

recipeController.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`delete recipe ${id}`);
});

export default recipeController;
