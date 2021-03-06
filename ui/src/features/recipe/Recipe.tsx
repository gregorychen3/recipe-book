import { Grid, InputAdornment, Link, List, ListItem, ListItemText, TextField } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { LabelDivider } from "mui-label-divider";
import React, { useEffect, useState } from "react";
import { IRecipe } from "../../../../src/types";
import { formatIngredient } from "../../features/recipe/helpers";
import { isValidURL } from "../../helpers";

interface Props {
  recipe: IRecipe;
}
export default function Recipe({ recipe }: Props) {
  const [servings, setServings] = useState(recipe.servings);
  useEffect(() => {
    setServings(recipe.servings);
  }, [recipe.servings]);

  const handleServingsChanged = (e: React.ChangeEvent<HTMLInputElement>) => setServings(parseFloat(e.target.value));

  return (
    <>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid container item sm={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <LabelDivider>INGREDIENTS</LabelDivider>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Servings" type="number" value={servings} onChange={handleServingsChanged} />
          </Grid>
          <Grid item xs={6}>
            <List component="ul" dense>
              {recipe.ingredients.map((i, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={formatIngredient(i, recipe.servings, servings)} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6}>
          <LabelDivider>INSTRUCTIONS</LabelDivider>
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
            <LabelDivider>METADATA</LabelDivider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cuisine"
              value={recipe.cuisine}
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
              value={recipe.course}
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
          <LabelDivider>SOURCES</LabelDivider>
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
