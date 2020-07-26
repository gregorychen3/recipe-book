import express from "express";

const recipeController = express.Router();

recipeController.get("/", (req, res) => res.send("get recipes"));

recipeController.get("/:id", (req, res) => {
  const { id } = req.params;
  return res.send(`get recipe ${id}`);
});

recipeController.post("/", (req, res) => {
  res.send("create recipe");
});

export default recipeController;
