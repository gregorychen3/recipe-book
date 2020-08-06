export const CourseValues = [
  "Antipasti",
  "Primi",
  "Secondi",
  "Dolci",
  "Contorni",
  "Sauces",
  "Beverages",
  "Other",
] as const;
export type ICourse = typeof CourseValues[number];

export const CuisineValues = ["Italian", "Anglophone", "Mediterranean", "French", "Asian", "Other"] as const;
export type ICuisine = typeof CuisineValues[number];

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
