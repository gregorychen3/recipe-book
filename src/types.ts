export const CourseValues = [
  "antipasti",
  "primi",
  "secondi",
  "dolci",
  "contorni",
  "sauces",
  "beverages",
  "other",
] as const;
type ICourse = typeof CourseValues[number];

export const CuisineValues = [
  "italian",
  "anglophone",
  "mediterranean",
  "french",
  "asian",
  "other",
] as const;
type ICuisine = typeof CuisineValues[number];

export interface IIngredient {
  name: string;
  qty?: number;
  unit?: string;
}

export interface IRecipe {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IIngredient[];
  instructions: string[];
  sources: string[];
}
