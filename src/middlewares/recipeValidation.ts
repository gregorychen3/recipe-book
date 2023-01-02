import { check } from "express-validator";

export const recipeValidation = [
  check("id").exists().isString(),
  check("name").exists().isString().notEmpty(),
  check("servings").exists().isNumeric(),
  check("ingredients").exists().isArray(),
  check("ingredients.*")
    .exists()
    .custom((ingredient: any) => {
      if (!ingredient.name) {
        throw new Error("Ingredient name missing");
      }
      if (typeof ingredient.name !== "string") {
        throw new Error("Ingredient name must be string");
      }
      if (ingredient.qty && typeof ingredient.qty !== "number") {
        throw new Error("Ingredient qty must be number");
      }
      if (ingredient.unit && typeof ingredient.unit !== "string") {
        throw new Error("Ingredient unit must be string");
      }
      if (ingredient.unit && !ingredient.qty) {
        throw new Error("Ingredient has unit but no qty");
      }
      return true;
    }),
  check("instructions").exists().isArray(),
  check("instructions.*").exists({ checkFalsy: true }).isString(),
  check("sources").exists().isArray(),
  check("sources.*").exists({ checkFalsy: true }).isString(),
  check("lastUpdatedAt").exists().isString().notEmpty(),
  check("tags").exists().isObject(),
];
