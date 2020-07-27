import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React, { useState } from "react";
import { IRecipe } from "../../../../src/types";
import IconText from "../../components/IconText";
import LabelDivider from "../../components/LabelDivider";
import { formatIngredient } from "../../features/recipe/helpers";
import { isValidURL } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  ingredientsContainer: { paddingRight: theme.spacing(2) },
  instructionsContainer: { paddingLeft: theme.spacing(2) },
}));

interface Props {
  recipe: IRecipe;
}
export default function Recipe({ recipe }: Props) {
  const classes = useStyles();

  const [servings, setServings] = useState(recipe.servings);

  const handleServingsChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setServings(parseInt(e.target.value));

  return (
    <>
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

      <Grid container direction="row">
        <Grid item xs={6} className={classes.ingredientsContainer}>
          <LabelDivider label="INGREDIENTS" />
          <TextField
            label="Servings"
            type="number"
            value={servings}
            onChange={handleServingsChanged}
          />
          <List component="ul" dense>
            {recipe.ingredients.map((i) => (
              <ListItem>
                <ListItemText primary={`• ${formatIngredient(i)}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6} className={classes.instructionsContainer}>
          <LabelDivider label="INSTRUCTIONS" />
          <List component="ol" dense>
            {recipe.instructions.map((i, idx) => (
              <ListItem>
                <ListItemText primary={`${idx + 1}. ${i}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

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
