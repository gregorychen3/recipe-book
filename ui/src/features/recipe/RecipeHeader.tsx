import { Grid, Typography } from "@mui/material";
import ActionMenu from "../../components/ActionMenu";

interface Props {
  title: string;
  onDelete?: () => void;
  onEdit?: () => void;
  disableSave?: boolean;
}
export default function RecipeHeader({ title, onDelete, onEdit, disableSave }: Props) {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={12} md={2} />
      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={2} justifyContent="center">
        <Grid item>
          <Typography align="center" component="span">
            <ActionMenu onDelete={onDelete} onEdit={onEdit} disableSave={!!disableSave} />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
