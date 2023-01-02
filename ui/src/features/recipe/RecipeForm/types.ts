import { Recipe } from "../../../../../src/recipe";

export const defaultIngredient = (): IngredientValues => ({
  qty: "",
  unit: "",
  name: "",
});

export const defaultInstruction = () => ({ value: "" });

export const defaultSource = () => ({ value: "" });

export const defaultValues: RecipeFormValues = {
  id: "",
  name: "",
  course: "Primi",
  cuisine: "Italian",
  servings: 2,
  ingredients: [defaultIngredient()],
  instructions: [defaultInstruction()],
  sources: [defaultSource()],
};

export const valuesFromRecipe = (r: Recipe): RecipeFormValues => {
  const { id, name, servings, ingredients, instructions, sources } = r;
  return {
    id,
    name,
    course: r.tags.course,
    cuisine: r.tags.cuisine,
    servings,
    ingredients: [
      ...ingredients.map((i) => ({
        qty: i.qty ?? ("" as const),
        unit: i.unit ?? "",
        name: i.name,
      })),
      defaultIngredient(),
    ],
    instructions: [
      ...instructions.map((i) => ({ value: i })),
      defaultInstruction(),
    ],
    sources: [...sources.map((s) => ({ value: s })), defaultSource()],
  };
};

export const recipeFromValues = ({
  id,
  name,
  course,
  cuisine,
  servings,
  ingredients,
  instructions,
  sources,
}: RecipeFormValues): Recipe => ({
  id,
  name,
  servings,
  ingredients: ingredients
    .filter((i) => i.name)
    .map((i) => ({
      qty: i.qty || undefined,
      unit: i.unit || undefined,
      name: i.name,
    })),
  instructions: instructions.map((i) => i.value).filter((x) => x),
  sources: sources.map((s) => s.value).filter((x) => x),
  tags: { course, cuisine },
  lastUpdatedAt: new Date().toISOString(),
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
  id: string;
  name: string;
  course: string;
  cuisine: string;
  servings: number;
  ingredients: IngredientValues[];
  instructions: Instruction[];
  sources: Source[];
}
