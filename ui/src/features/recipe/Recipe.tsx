import LanguageIcon from "@mui/icons-material/Language";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Grid,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { LabelDivider } from "mui-label-divider";
import React, { useEffect, useState } from "react";
import { Recipe as RecipeModel } from "../../../../src/recipe";
import { formatIngredient } from "../../features/recipe/helpers";

const urlRegex = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

const isValidURL = (s: string) => urlRegex.test(s);

interface Props {
  recipe: RecipeModel;
}

export function Recipe({ recipe }: Props) {
  const [servings, setServings] = useState(recipe.servings);
  useEffect(() => {
    setServings(recipe.servings);
  }, [recipe.servings]);

  const handleServingsChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setServings(parseFloat(e.target.value));

  return (
    <>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid container item sm={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <LabelDivider label="INGREDIENTS" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Servings"
              type="number"
              value={servings}
              onChange={handleServingsChanged}
            />
          </Grid>
          <Grid item xs={6}>
            <List component="ul" dense>
              {recipe.ingredients.map((i, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={formatIngredient(i, recipe.servings, servings)}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6}>
          <LabelDivider label="INSTRUCTIONS" />
          <List component="ol" dense>
            {recipe.instructions.map((i, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={i} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid container item sm={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <LabelDivider label="METADATA" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cuisine"
              value={recipe.tags.cuisine}
              disabled
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Course"
              value={recipe.tags.course}
              disabled
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <LabelDivider label="SOURCES" />
          <List dense component="nav">
            {recipe.sources.map((s, idx) => (
              <ListItem key={idx}>
                {isValidURL(s) ? (
                  <ListItemText>
                    <Link href={s}>{s}</Link>
                  </ListItemText>
                ) : (
                  <ListItemText primary={s} />
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
