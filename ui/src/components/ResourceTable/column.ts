import { TableCellProps } from "@mui/material";

export interface Column<T> {
  id: string;
  enumerable?: boolean;
  label: React.ReactNode;
  headerProps?: TableCellProps;
  cellProps?: TableCellProps;
  getValue?: (t: T) => string | number | null | undefined;

  // getDisplay can be used to render a richer component in a table cell.
  // getValue will still be required for sorting, filtering, etc.
  getDisplay?: (t: T) => React.ReactNode;
}
