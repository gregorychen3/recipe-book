export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: {
    qty?: number;
    unit?: string;
    name: string;
  }[];
  instructions: string[];
  sources: string[];
  lastUpdatedAt: string;
  tags: {
    course: string;
    cuisine: string;
    [key: string]: string;
  };
}
