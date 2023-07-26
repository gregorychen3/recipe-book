import { Ingredient, Recipe } from "../../../../src/recipe";

export const formatIngredient = (
  i: Ingredient,
  defaultServings: number,
  desiredServings: number
) => {
  let ret = "";

  if (i.qty) {
    const qtyDisplay = desiredServings
      ? ((i.qty / defaultServings) * desiredServings).toFixed(2)
      : "--";
    ret += `${qtyDisplay} `;
  }

  i.unit && (ret += `${i.unit} `);
  ret += i.name;
  return ret;
};

export const getCuisines = (recipes: Recipe[]) => [
  ...new Set<string>(recipes.map((r) => r.tags.cuisine)),
];
