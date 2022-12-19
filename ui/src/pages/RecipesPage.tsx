export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = typeof GroupByValues[number];

export default function RecipesPage() {
  return "RecipesPage";
}
