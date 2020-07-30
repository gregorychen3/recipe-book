import { Button, ButtonGroup, ButtonGroupProps, makeStyles } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

const useStyles = makeStyles((theme) => ({
  success: { color: theme.palette.success.main },
}));

interface Props {
  onDelete: () => void;
  onEdit?: () => void;
  disableSave: boolean;
}
export default function ActionMenu(props: Props & ButtonGroupProps) {
  const { onDelete, onEdit, disableSave, ...buttonGroupProps } = props;
  const classes = useStyles();
  return (
    <ButtonGroup variant="text" color="primary" {...buttonGroupProps}>
      <Button size="small" onClick={onDelete}>
        <DeleteOutlineIcon fontSize="small" color="error" />
      </Button>
      <Button size="small" onClick={onEdit} disabled={!onEdit}>
        <EditIcon fontSize="small" />
      </Button>
      <Button type="submit" form="recipe-form" size="small" disabled={disableSave} className={classes.success}>
        <SaveIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
