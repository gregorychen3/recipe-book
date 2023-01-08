import FilterListIcon from "@mui/icons-material/FilterList";
import { ListItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import _ from "lodash";
import React, { ChangeEvent } from "react";
import { ArrayParam, useQueryParam } from "use-query-params";
import { Column } from "./column";
import { Order } from "./order";

export interface TableHeadProps<T> {
  numSelected: number;
  onRequestSort: (e: React.MouseEvent<unknown>, column: string) => void;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: Column<T>[];
  items: T[];
}

export function TableHead<T>({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columns,
  items,
}: TableHeadProps<T>) {
  const createSortHandler =
    (column: string) => (e: React.MouseEvent<unknown>) =>
      onRequestSort(e, column);

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((c) => (
          <HeaderCell
            column={c}
            orderBy={orderBy}
            order={order}
            onClick={createSortHandler(c.id)}
            values={c.getValue ? items.map(c.getValue) : []}
            key={c.id}
          />
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

interface HeaderCellProps<T> {
  column: Column<T>;
  orderBy: string;
  order: Order;
  onClick: (e: React.MouseEvent<unknown>) => void;
  values: (string | number | null | undefined)[];
}

function HeaderCell<T>({
  column,
  orderBy,
  order,
  onClick,
  values,
}: HeaderCellProps<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleFilterClicked = (e: React.MouseEvent<HTMLButtonElement>) =>
    anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget);

  const [selected, setSelected] = useQueryParam(column.id, ArrayParam);

  return (
    <TableCell
      {...column.headerProps}
      sortDirection={orderBy === column.id ? order : false}
    >
      {column.getValue ? (
        <TableSortLabel
          active={orderBy === column.id}
          direction={orderBy === column.id ? order : "asc"}
          onClick={onClick}
        >
          {column.label}
        </TableSortLabel>
      ) : (
        column.label
      )}

      {column.enumerable && (
        <>
          <IconButton
            color={(selected?.length ?? 0) > 0 ? "primary" : "inherit"}
            onClick={handleFilterClicked}
            size="small"
          >
            <FilterListIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleFilterClicked}
          >
            <ListItem dense>
              <ListItemText>{column.label} Filter</ListItemText>
            </ListItem>

            {Object.entries(_.countBy(values)).map(([v, count]) => {
              const isSelected = selected?.some((s) => s === v) ?? false;

              const handleFilterSelect = (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  setSelected((s) => (s ? [...s, v] : [v]));
                } else {
                  setSelected((s) => s?.filter((x) => x !== v));
                }
              };

              return (
                <MenuItem key={v} dense>
                  <ListItemIcon>
                    <Checkbox
                      checked={isSelected}
                      onChange={handleFilterSelect}
                    />
                  </ListItemIcon>
                  {v} ({count})
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}
    </TableCell>
  );
}
