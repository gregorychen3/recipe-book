import { ButtonGroup, ButtonGroupProps, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
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
      <IconButton size="small" onClick={onDelete}>
        <DeleteOutlineIcon fontSize="small" color="error" />
      </IconButton>
      <IconButton size="small" onClick={onEdit} disabled={!onEdit}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton type="submit" form="recipe-form" size="small" disabled={disableSave} className={classes.success}>
        <SaveIcon fontSize="small" />
      </IconButton>
    </ButtonGroup>
  );
}
