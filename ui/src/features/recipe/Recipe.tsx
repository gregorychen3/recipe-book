import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React from "react";
import { IRecipe } from "../../../../src/types";
import IconText from "../../components/IconText";
import LabelDivider from "../../components/LabelDivider";
import { formatIngredient } from "../../features/recipe/helpers";
import { isValidURL } from "../../helpers";

interface Props {
  recipe: IRecipe;
}
export default function Recipe({ recipe }: Props) {
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
            <ListItemText primary={`${idx + 1}. ${i}`} />
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
