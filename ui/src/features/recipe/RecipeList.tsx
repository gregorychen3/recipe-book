import { List, ListItem, ListItemText } from "@mui/material";
import _ from "lodash";
import { LabelDivider } from "mui-label-divider";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRecipeModel } from "../../../../src/db/recipe";
import { GroupBy } from "../../pages/RecipesPage";
import { CourseValues } from "../../types";
import { getCuisines } from "./helpers";
import { selectRecipes } from "./RecipeSlice";

const AlphabeticalList = ({ recipes }: { recipes: IRecipeModel[] }) => {
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

const ByCuisineList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const h = useHistory();
  const cuisines = getCuisines(recipes);
  return (
    <>
      {cuisines.map((cuisine) => (
        <React.Fragment key={cuisine}>
          <LabelDivider label={cuisine.toUpperCase()} />
          <List dense component="nav">
            {recipes
              .filter((r) => r.cuisine === cuisine)
              .map((r) => (
                <ListItem button component="a" onClick={() => h.push(`recipes/${r.id}`)} key={r.id}>
                  <ListItemText primary={r.name} />
                </ListItem>
              ))}
          </List>
        </React.Fragment>
      ))}
    </>
  );
};

const ByCourseList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const h = useHistory();
  return (
    <>
      {CourseValues.map((course) => (
        <React.Fragment key={course}>
          <LabelDivider label={course.toUpperCase()} />
          <List dense component="nav" key={course}>
            {recipes
              .filter((r) => r.course === course)
              .map((r) => (
                <ListItem button component="a" onClick={() => h.push(`recipes/${r.id}`)} key={r.id}>
                  <ListItemText primary={r.name} />
                </ListItem>
              ))}
          </List>
        </React.Fragment>
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
    case "course":
      return <ByCourseList recipes={recipes} />;
    default:
      return null;
  }
}
