import { List, ListItem, ListItemText } from "@mui/material";
import _ from "lodash";
import { LabelDivider } from "mui-label-divider";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Recipe } from "../../../../src/recipe";
import { selectRecipes } from "./recipeSlice";

const AlphabeticalList = ({ recipes }: { recipes: Recipe[] }) => {
  const h = useHistory();
  return (
    <>
      <LabelDivider label="A-Z" />
      <List dense component="ol">
        {_.sortBy(recipes, (r) => r.name).map((r) => (
          <ListItem button onClick={() => h.push(`recipes/${r.id}`)} key={r.id}>
            <ListItemText primary={r.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export function RecipeList() {
  const recipes = _.sortBy(useSelector(selectRecipes), (r) => r.name);

  return <AlphabeticalList recipes={recipes} />;
}
