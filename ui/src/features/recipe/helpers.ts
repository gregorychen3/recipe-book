import { IIngredient, IRecipe } from "../../../../src/types";

export const formatIngredient = (i: IIngredient, defaultServings: number, desiredServings: number) => {
  let ret = "";

  if (i.qty) {
    const qtyDisplay = desiredServings ? ((i.qty / defaultServings) * desiredServings).toFixed(2) : "--";
    ret += `${qtyDisplay} `;
  }

  i.unit && (ret += `${i.unit} `);
  ret += i.name;
  return ret;
};

export const getCourses = (recipes: IRecipe[]) => [...new Set<string>(recipes.map((r) => r.course))];
export const getCuisines = (recipes: IRecipe[]) => [...new Set<string>(recipes.map((r) => r.cuisine))];
