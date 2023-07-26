import { Skeleton, styled } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Fuse from "fuse.js";
import _ from "lodash";
import * as querystring from "querystring";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  DelimitedArrayParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { notEmpty } from "../../helpers";
import { TableHead } from "./ResourceTableHead";
import { Toolbar } from "./ResourceTableToolbar";
import { Action, SelectAction } from "./actions";
import { Column } from "./column";
import { Order, isOrder } from "./order";

const Container = styled(Paper)`
  width: 100%;
`;

const sxTable = { minWidth: 750 };

export interface ResourceTableProps<T, S> {
  title: string;
  defaultSortColumn: string;
  defaultSortOrder?: Order;
  idExtractor: (t: T) => string;
  formatSearchEntry: (t: T) => S | undefined;
  searchIdExtractor: (s: S) => string;
  searchOptions: Fuse.IFuseOptions<S>;
  items: T[];
  columns: Column<T>[];
  actions?: Action[];
  selectActions?: SelectAction<T>[];
  onRowClick?: (item: T) => void;
  size?: "small" | "medium";
}

export function ResourceTable<T, S>({
  items,
  columns,
  defaultSortColumn,
  defaultSortOrder = "asc",
  idExtractor,
  formatSearchEntry,
  searchIdExtractor,
  searchOptions,
  title,
  actions,
  selectActions,
  onRowClick,
  size = "medium",
}: ResourceTableProps<T, S>) {
  const location = useLocation();

  const fuse = useMemo(() => {
    const entries = items.map(formatSearchEntry).filter(notEmpty);
    return new Fuse(entries, searchOptions);
  }, [items, formatSearchEntry, searchOptions]);

  const [q, setQ] = useQueryParams({
    search: withDefault(StringParam, ""),
    order: withDefault(StringParam, defaultSortOrder),
    orderBy: withDefault(StringParam, defaultSortColumn),
    selectedIds: withDefault(DelimitedArrayParam, [] as (string | null)[]),
  });

  const { search } = q;

  const getSelectedItems = () =>
    q.selectedIds
      .filter(notEmpty)
      .map((id) => filteredItems.find((i) => idExtractor(i) === id))
      .filter(notEmpty);

  const filteredItems = useMemo(() => {
    const query = querystring.parse(location.search.substring(1));

    const searchedIds = new Set(
      search
        ? fuse.search(search).map((res) => searchIdExtractor(res.item))
        : []
    );

    return items
      .filter((item) => !search || searchedIds.has(idExtractor(item)))
      .filter((item) =>
        columns.every((col) => {
          if (!col.getValue || !_.has(query, col.id)) {
            return true;
          }

          const filter = query[col.id];
          const value = col.getValue(item);

          return Array.isArray(filter)
            ? _.includes(filter, value)
            : filter === value;
        })
      );
  }, [
    location.search,
    columns,
    items,
    search,
    fuse,
    searchIdExtractor,
    idExtractor,
  ]);

  const getComparator = (
    order: Order,
    orderBy: string
  ): ((a: T, b: T) => number) => {
    const valueExtractor = columns.find((c) => c.id === orderBy)?.getValue;
    if (!valueExtractor) {
      return (_, __) => -1;
    }

    return (a: T, b: T) => {
      const aVal = valueExtractor(a);
      const bVal = valueExtractor(b);
      if (
        aVal === null ||
        aVal === undefined ||
        bVal === null ||
        bVal === undefined
      ) {
        return -1;
      }

      let sortInt = -1;
      switch (typeof aVal) {
        case "number":
          sortInt = aVal - (bVal as number);
          break;
        case "string":
          sortInt = aVal.localeCompare(bVal as string);
          break;
      }

      return order === "asc" ? sortInt : sortInt * -1;
    };
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, column: string) => {
    const isAsc = q.orderBy === column && q.order === "asc";
    setQ({ order: isAsc ? "desc" : "asc", orderBy: column });
  };

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const selectedIds = filteredItems.map((i) => idExtractor(i));
      setQ({ selectedIds });
      return;
    }

    setQ({ selectedIds: [] });
  };

  const handleSelect = (e: React.MouseEvent<unknown>, itemId: string) => {
    e.stopPropagation();

    q.selectedIds.includes(itemId)
      ? setQ({ selectedIds: q.selectedIds.filter((id) => id !== itemId) })
      : setQ({ selectedIds: [...q.selectedIds, itemId] });
  };

  const selectedItems = getSelectedItems();

  return (
    <Container>
      <Toolbar
        title={title}
        selectedItems={selectedItems}
        actions={actions}
        selectActions={selectActions}
        searchText={q.search}
        onSearch={(searchText: string) => setQ({ search: searchText })}
      />

      <TableContainer>
        <Table sx={sxTable} size={size}>
          <TableHead
            numSelected={selectedItems.length}
            order={isOrder(q.order) ? q.order : "asc"}
            orderBy={q.orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
            columns={columns}
            items={items}
          />

          <TableBody>
            {filteredItems
              .sort(
                getComparator(isOrder(q.order) ? q.order : "asc", q.orderBy)
              )
              .map((item, idx) => {
                const itemId = idExtractor(item);
                const isItemSelected =
                  q.selectedIds.some((s) => s === itemId) ?? false;
                const labelId = `enhanced-table-checkbox-${idx}`;

                return (
                  <TableRow
                    hover
                    onClick={() => onRowClick?.(item)}
                    role="checkbox"
                    tabIndex={-1}
                    key={itemId}
                    selected={isItemSelected}
                  >
                    <TableCell
                      onClick={(e) => handleSelect(e, itemId)}
                      id={labelId}
                      padding="checkbox"
                    >
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    {columns.map((column) => {
                      const contents =
                        column.getDisplay?.(item) ?? column.getValue?.(item);
                      return (
                        <TableCell key={column.id} {...column.cellProps}>
                          {contents != null ? (
                            contents
                          ) : (
                            <Skeleton variant="text" />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
