import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db";
import { recipeValidation } from "../middlewares/recipeValidation";
import { Recipe } from "../recipe";

const selectRecipeQ = "SELECT body FROM recipe WHERE id=$1";
const selectRecipesQ = "SELECT body FROM recipe";
const createRecipeQ =
  "INSERT INTO recipe(id, body) VALUES($1, $2) RETURNING body";
const updateRecipeQ = "UPDATE recipe set body=$1 where id=$2 RETURNING body";
const deleteRecipeQ = "DELETE FROM recipe WHERE id=$1 returning body";

const recipeController = express.Router();

recipeController.get("/", async (_, res) => {
  const dbResp = await db.query(selectRecipesQ);
  return res.send(dbResp.rows);
});

recipeController.get("/:id", async (req, res) => {
  const dbResp = await db.query(selectRecipeQ, [req.params.id]);
  if (!dbResp.rowCount) {
    return res.sendStatus(404);
  }

  return res.send(dbResp.rows[0]);
});

recipeController.post(
  "/",
  /*auth,*/ recipeValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const recipe: Recipe = req.body;
    recipe.id = uuidv4();

    const dbResp = await db.query(createRecipeQ, [recipe.id, recipe]);
    return res.send(dbResp.rows[0]);
  }
);

recipeController.post(
  "/:id",
  /*auth,*/ recipeValidation,
  async (req: Request, res: Response) => {
    const rid = req.params.id;
    const recipe: Recipe = req.body;
    if (rid !== recipe.id) {
      res
        .status(400)
        .send({ error: "url param and recipe body id do not match" });
    }

    const dbResp = await db.query(updateRecipeQ, [recipe, rid]);
    return res.send(dbResp.rows[0]);
  }
);

recipeController.delete(
  "/:id",
  /*auth,*/ async (req, res) => {
    const rid = req.params.id;
    const dbResp = await db.query(deleteRecipeQ, [rid]);
    return res.send(dbResp.rows);
  }
);

export default recipeController;
