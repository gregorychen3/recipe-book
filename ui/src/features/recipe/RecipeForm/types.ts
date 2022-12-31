import { ICourse, ICuisine, IIngredient, IRecipe } from "../../../../../src/types";

export const defaultIngredient = (): IngredientValues => ({ qty: "", unit: "", name: "" });

export const defaultInstruction = () => ({ value: "" });

export const defaultSource = () => ({ value: "" });

export const defaultValues: RecipeFormValues = {
  name: "",
  course: "Primi",
  cuisine: "Italian",
  servings: 2,
  ingredients: [defaultIngredient()],
  instructions: [defaultInstruction()],
  sources: [defaultSource()],
};

export const valuesFromRecipe = (r: IRecipe): RecipeFormValues => {
  const { name, course, cuisine, servings, ingredients, instructions, sources } = r;
  const ret: RecipeFormValues = {
    name,
    course,
    cuisine,
    servings,
    ingredients: [
      ...ingredients.map((i) => ({
        qty: i.qty ?? ("" as const),
        unit: i.unit ?? "",
        name: i.name,
      })),
      defaultIngredient(),
    ],
    instructions: [...instructions.map((i) => ({ value: i })), defaultInstruction()],
    sources: [...sources.map((s) => ({ value: s })), defaultSource()],
  };
  return ret;
};

export const recipeFromValues = ({
  name,
  course,
  cuisine,
  servings,
  ingredients,
  instructions,
  sources,
}: RecipeFormValues): IRecipe => ({
  name,
  course,
  cuisine,
  servings,
  ingredients: ingredients
    .filter((i) => i.name)
    .map((i): IIngredient => ({ qty: i.qty || undefined, unit: i.unit || undefined, name: i.name })),
  instructions: instructions.map((i) => i.value).filter((x) => x),
  sources: sources.map((s) => s.value).filter((x) => x),
});

interface IngredientValues {
  qty: number | "";
  unit: string;
  name: string;
}

interface Instruction {
  value: string;
}

interface Source {
  value: string;
}

export interface RecipeFormValues {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IngredientValues[];
  instructions: Instruction[];
  sources: Source[];
}
