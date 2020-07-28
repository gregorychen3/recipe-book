import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  TextField,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React, { useState } from "react";
import { IRecipe } from "../../../../src/types";
import LabelDivider from "../../components/LabelDivider";
import { formatIngredient } from "../../features/recipe/helpers";
import { isValidURL } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  gridItem: { padding: theme.spacing(2) },
}));

interface Props {
  recipe: IRecipe;
}
export default function Recipe({ recipe }: Props) {
  const classes = useStyles();

  const [servings, setServings] = useState(recipe.servings);

  const handleServingsChanged = (e: React.ChangeEvent<HTMLInputElement>) => setServings(parseInt(e.target.value));

  return (
    <>
      <Grid container direction="row">
        <Grid container item xs={6} className={classes.gridItem}>
          <Grid item xs={12}>
            <LabelDivider label="INGREDIENTS" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Servings" type="number" value={servings} onChange={handleServingsChanged} />
          </Grid>
          <Grid item xs={6}>
            <List component="ul" dense>
              {recipe.ingredients.map((i, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`• ${formatIngredient(i)}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <LabelDivider label="INSTRUCTIONS" />
          <List component="ol" dense>
            {recipe.instructions.map((i, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`${idx + 1}. ${i}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item xs={12}>
          <LabelDivider label="INFORMATION" />
        </Grid>

        <Grid item xs={6}>
          <List dense component="nav" subheader={<ListSubheader component="div">Cuisine</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={recipe.cuisine} />
            </ListItem>
          </List>
          <List dense component="nav" subheader={<ListSubheader component="div">Course</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={recipe.course} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List dense component="nav" subheader={<ListSubheader component="div">Sources</ListSubheader>}>
            {recipe.sources.map((s, idx) => (
              <ListItem key={idx}>
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
        </Grid>
      </Grid>
    </>
  );
}
