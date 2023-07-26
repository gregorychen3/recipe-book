import SearchIcon from "@mui/icons-material/Search";
import { styled, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import { default as MuiToolbar } from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
import { Action, SelectAction } from "./actions";

const StyledToolbar = styled(MuiToolbar, { shouldForwardProp: (p) => p !== "active" })<{ active: boolean }>(
  ({ active, theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    ...(active
      ? {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }
      : {}),
  })
);

const ToolbarTitle = styled(Typography)`
  flex: 1 1 100%;
`;

interface ToolbarProps<T> {
  title: string;
  selectedItems: T[];
  actions?: Action[];
  searchText?: string;
  selectActions?: SelectAction<T>[];
  onSearch: (searchText: string) => void;
}

export function Toolbar<T>({ title, actions, selectActions, selectedItems, searchText, onSearch }: ToolbarProps<T>) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchButtonClicked = () => {
    if (!showSearchInput) {
      setShowSearchInput(true);
      return;
    }

    debouncedSearch("");
    setShowSearchInput(false);
  };

  const debouncedSearch = _.debounce(onSearch, 300);
  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    debouncedSearch(e.target.value);

  const numSelected = selectedItems.length;

  return (
    <StyledToolbar active={numSelected > 0}>
      <ToolbarTitle variant="h6">
        {title} {numSelected > 0 ? `(${numSelected} selected)` : undefined}
      </ToolbarTitle>

      {showSearchInput && <TextField defaultValue={searchText} onChange={handleSearchChanged} autoFocus />}
      <IconButton onClick={handleSearchButtonClicked} color="primary">
        <SearchIcon />
      </IconButton>

      {actions?.map((action) => (
        <Tooltip key={action.title} title={action.title}>
          <IconButton onClick={action.onClick}>{action.icon}</IconButton>
        </Tooltip>
      ))}

      {numSelected > 0 &&
        selectActions?.map((action) => (
          <Tooltip key={action.title} title={action.title}>
            <IconButton onClick={() => action.onClick(selectedItems)}>{action.icon}</IconButton>
          </Tooltip>
        ))}
    </StyledToolbar>
  );
}
