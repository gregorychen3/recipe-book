import { List, ListItem, ListItemText } from "@material-ui/core";
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
  const history = useHistory();
  return (
    <>
      <LabelDivider>A-Z</LabelDivider>
      <List dense component="ol">
        {_.sortBy(recipes, (r) => r.name).map((r) => (
          <ListItem button onClick={() => history.push(`recipes/${r.id}`)} key={r.id}>
            <ListItemText primary={r.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

const ByCuisineList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const history = useHistory();
  const cuisines = getCuisines(recipes);
  return (
    <>
      {cuisines.map((cuisine) => (
        <React.Fragment key={cuisine}>
          <LabelDivider>{cuisine.toUpperCase()}</LabelDivider>
          <List dense component="nav">
            {recipes
              .filter((r) => r.cuisine === cuisine)
              .map((r) => (
                <ListItem button component="a" onClick={() => history.push(`recipes/${r.id}`)} key={r.id}>
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
  const history = useHistory();
  return (
    <>
      {CourseValues.map((course) => (
        <React.Fragment key={course}>
          <LabelDivider>{course.toUpperCase()}</LabelDivider>
          <List dense component="nav" key={course}>
            {recipes
              .filter((r) => r.course === course)
              .map((r) => (
                <ListItem button component="a" onClick={() => history.push(`recipes/${r.id}`)} key={r.id}>
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
