import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { IRecipeModel } from "../../../../src/db/recipe";
import { GroupBy } from "../../pages/RecipesPage";
import { selectRecipes } from "./RecipeSlice";

const AlphabeticalList = ({ recipes }: { recipes: IRecipeModel[] }) => (
  <List
    component="nav"
    subheader={<ListSubheader component="div">A-Z</ListSubheader>}
  >
    <Divider />
    {_.sortBy(recipes, (r) => r.name).map((r) => (
      <ListItem button>
        <ListItemText primary={r.name} />
      </ListItem>
    ))}
  </List>
);

const ByCuisineList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const cuisines = [...new Set<string>(recipes.map((r) => r.cuisine))];
  return (
    <>
      {cuisines.map((cuisine) => (
        <List
          component="nav"
          subheader={<ListSubheader component="div">{cuisine}</ListSubheader>}
        >
          <Divider />
          {recipes
            .filter((r) => r.cuisine === cuisine)
            .map((r) => (
              <ListItem button>
                <ListItemText primary={r.name} />
              </ListItem>
            ))}
        </List>
      ))}
    </>
  );
};

interface Props {
  groupBy: GroupBy;
}
export default function RecipeList({ groupBy }: Props) {
  const recipes = _.sortBy(useSelector(selectRecipes), (r) => r.name);

  switch (groupBy) {
    case "alphabetical":
      return <AlphabeticalList recipes={recipes} />;
    case "cuisine":
      return <ByCuisineList recipes={recipes} />;
    default:
      return null;
  }
}
