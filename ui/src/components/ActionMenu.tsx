import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, ButtonGroup, ButtonGroupProps } from "@mui/material";

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
  disableSave: boolean;
}

export default function ActionMenu(props: Props & ButtonGroupProps) {
  const { onDelete, onEdit, disableSave, ...buttonGroupProps } = props;

  return (
    <ButtonGroup variant="text" color="primary" {...buttonGroupProps}>
      <Button size="small" onClick={onDelete} disabled={!onDelete}>
        <DeleteOutlineIcon fontSize="small" color={onDelete ? "error" : undefined} />
      </Button>
      <Button size="small" onClick={onEdit} disabled={!onEdit}>
        <EditIcon fontSize="small" />
      </Button>
      <Button type="submit" form="recipe-form" size="small" color="success" disabled={disableSave}>
        <SaveIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
