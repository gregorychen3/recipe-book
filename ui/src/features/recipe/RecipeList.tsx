import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../../../src/recipe";
import { Column, ResourceTable } from "../../components/ResourceTable";
import { selectRecipes } from "./recipeSlice";

const columns: Column<Recipe>[] = [
  { id: "name", label: "Name", getValue: (r) => r.name },
  { id: "cuisine", label: "Cuisine", getValue: (r) => r.tags.cuisine },
  { id: "course", label: "Course", getValue: (r) => r.tags.course },
  {
    id: "lastUpdatedAt",
    label: "Last Updated",
    getValue: (r) => r.lastUpdatedAt,
  },
];

export function RecipeList() {
  const nav = useNavigate();

  const recipes = Object.values(useSelector(selectRecipes));

  return (
    <ResourceTable
      title="Recipes"
      size="small"
      columns={columns}
      onRowClick={(r) => nav(`recipes/${r.id}`)}
      items={recipes}
      defaultSortColumn="name"
      idExtractor={(r) => r.id}
      formatSearchEntry={toSearchEntry}
      searchIdExtractor={searchIdExtractor}
      searchOptions={{ keys: searchKeys, ignoreLocation: true, threshold: 0 }}
    />
  );
}

const toSearchEntry = (r: Recipe) => ({
  id: r.id,
  name: r.name,
  ingredients: r.ingredients,
  instructions: r.instructions,
  sources: r.sources,
  tagsKeys: Object.keys(r.tags),
  tagsValues: Object.values(r.tags),
});

type RecipeSearchEntry = ReturnType<typeof toSearchEntry>;

const searchIdExtractor = (e: RecipeSearchEntry) => e.id;

const searchKeys = [
  "id",
  "name",
  "ingredients",
  "instructions",
  "sources",
  "tagsKeys",
  "tagsValues",
];
