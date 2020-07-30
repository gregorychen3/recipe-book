import { IIngredient, IRecipe } from "../../../../src/types";

export const formatIngredient = (i: IIngredient) => {
  let ret = "";
  i.qty && (ret += `${i.qty} `);
  i.unit && (ret += `${i.unit} `);
  ret += i.name;
  return ret;
};

export const getCourses = (recipes: IRecipe[]) => [...new Set<string>(recipes.map((r) => r.course))];
export const getCuisines = (recipes: IRecipe[]) => [...new Set<string>(recipes.map((r) => r.cuisine))];
