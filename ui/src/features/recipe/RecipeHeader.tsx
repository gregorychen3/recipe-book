import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ActionMenu from "../../components/ActionMenu";

interface Props {
  title: string;
  onDelete?: () => void;
  onEdit?: () => void;
  disableSave?: boolean;
}
export default function RecipeHeader({ title, onDelete, onEdit, disableSave }: Props) {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={12} md={2} />
      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <Typography align="center">
          <ActionMenu onDelete={onDelete} onEdit={onEdit} disableSave={!!disableSave} />
        </Typography>
      </Grid>
    </Grid>
  );
}
