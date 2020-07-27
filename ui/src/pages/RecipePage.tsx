import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import ActionMenu from "../components/ActionMenu";
import IconText from "../components/IconText";
import LabelDivider from "../components/LabelDivider";
import { formatIngredient } from "../features/recipe/helpers";
import { selectRecipe } from "../features/recipe/RecipeSlice";
import { isValidURL } from "../helpers";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  metadataRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  hidden: { visibility: "hidden" },
}));

export default function RecipePage() {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);

  const { recipeId } = useParams();
  const recipe = useSelector(selectRecipe(recipeId));
  if (!recipe) {
    return <Redirect to="/recipes" />;
  }

  const handleDeleteClicked = () => {};

  const handleEditClicked = () => {
    setIsEditing(true);
  };

  const handleSaveClicked = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className={classes.header}>
        <ActionMenu
          onDelete={() => {}}
          onEdit={() => {}}
          className={classes.hidden}
        />
        <Typography variant="h6">{recipe.name.toUpperCase()}</Typography>
        <ActionMenu
          onDelete={handleDeleteClicked}
          onEdit={isEditing ? undefined : handleEditClicked}
          onSave={isEditing ? handleSaveClicked : undefined}
        />
      </div>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item>
          <IconText
            icon={<RestaurantIcon />}
            text={<Typography variant="subtitle1">{recipe.course}</Typography>}
          />
        </Grid>
        <Grid item>
          <IconText
            icon={<LanguageIcon />}
            text={<Typography variant="subtitle1">{recipe.cuisine}</Typography>}
          />
        </Grid>
      </Grid>
      <LabelDivider label="INGREDIENTS" />
      <List component="ul" dense>
        {recipe.ingredients.map((i, idx) => (
          <ListItem>
            <ListItemText primary={`• ${formatIngredient(i)}`} />
          </ListItem>
        ))}
      </List>
      <LabelDivider label="INSTRUCTIONS" />
      <List component="ol" dense>
        {recipe.instructions.map((i, idx) => (
          <ListItem>
            <ListItemText primary={`${idx}. ${i}`} />
          </ListItem>
        ))}
      </List>
      <LabelDivider label="SOURCES" />
      <List component="ul" dense>
        {recipe.sources.map((s, idx) => (
          <ListItem>
            {isValidURL(s) ? (
              <ListItemText>
                • <Link href={s}>{s}</Link>
              </ListItemText>
            ) : (
              <ListItemText primary={`• ${s}`} />
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}
