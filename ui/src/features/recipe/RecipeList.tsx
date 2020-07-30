import { List, ListItem, ListItemText } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRecipeModel } from "../../../../src/db/recipe";
import LabelDivider from "../../components/LabelDivider";
import { GroupBy } from "../../pages/RecipesPage";
import { selectRecipes } from "./RecipeSlice";

const AlphabeticalList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const history = useHistory();
  return (
    <>
      <LabelDivider label="A-Z" />
      <List dense component="ol">
        {_.sortBy(recipes, (r) => r.name).map((r) => (
          <ListItem button onClick={() => history.push(`recipes/${r._id}`)} key={r._id}>
            <ListItemText primary={r.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

const ByCuisineList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const history = useHistory();
  const cuisines = [...new Set<string>(recipes.map((r) => r.cuisine))];
  return (
    <>
      {cuisines.map((cuisine) => (
        <>
          <LabelDivider label={cuisine.toUpperCase()} />
          <List dense component="nav">
            {recipes
              .filter((r) => r.cuisine === cuisine)
              .map((r) => (
                <ListItem button component="a" onClick={() => history.push(`recipes/${r._id}`)} key={r._id}>
                  <ListItemText primary={r.name} />
                </ListItem>
              ))}
          </List>
        </>
      ))}
    </>
  );
};

const ByCourseList = ({ recipes }: { recipes: IRecipeModel[] }) => {
  const history = useHistory();
  const courses = [...new Set<string>(recipes.map((r) => r.course))];
  return (
    <>
      {courses.map((course) => (
        <>
          <LabelDivider label={course.toUpperCase()} />
          <List dense component="nav" key={course}>
            {recipes
              .filter((r) => r.course === course)
              .map((r) => (
                <ListItem button component="a" onClick={() => history.push(`recipes/${r._id}`)} key={r._id}>
                  <ListItemText primary={r.name} />
                </ListItem>
              ))}
          </List>
        </>
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
