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
import { GroupBy } from "../../pages/RecipesPage";
import { selectRecipes } from "./RecipeSlice";
interface Props {
  groupBy: GroupBy;
}
export default function RecipeList({ groupBy }: Props) {
  const recipes = useSelector(selectRecipes);

  switch (groupBy) {
    case "alphabetical":
      return (
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
    default:
      return null;
  }
}
