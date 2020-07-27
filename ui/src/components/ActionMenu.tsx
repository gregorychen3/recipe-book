import { ButtonGroup, ButtonGroupProps, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface Props {
  onDelete: () => void;
  onEdit?: () => void;
  onSave?: () => void;
}
export default function ActionMenu(props: Props & ButtonGroupProps) {
  const { onDelete, onEdit, onSave, ...buttonGroupProps } = props;
  return (
    <ButtonGroup variant="text" color="primary" {...buttonGroupProps}>
      <IconButton size="small" onClick={onDelete}>
        <DeleteOutlineIcon fontSize="small" color="error" />
      </IconButton>
      {onSave && (
        <IconButton size="small" onClick={onSave}>
          <SaveIcon fontSize="small" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </ButtonGroup>
  );
}
