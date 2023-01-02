export interface Ingredient {
  qty?: number;
  unit?: string;
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  sources: string[];
  lastUpdatedAt: string;
  tags: {
    course: string;
    cuisine: string;
    [key: string]: string;
  };
}
