import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ActionMenu from "../../components/ActionMenu";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
  },
  hidden: { visibility: "hidden" },
}));

interface Props {
  title: string;
  onDelete?: () => void;
  onEdit?: () => void;
  disableSave?: boolean;
}
export default function RecipeHeader({ title, onDelete, onEdit, disableSave }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <ActionMenu disableSave={true} className={classes.hidden} />
      <Typography variant="h4">{title}</Typography>
      <ActionMenu onDelete={onDelete} onEdit={onEdit} disableSave={!!disableSave} />
    </div>
  );
}
