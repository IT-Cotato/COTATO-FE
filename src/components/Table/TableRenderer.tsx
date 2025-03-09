import React from 'react';
import { Stack, Table } from '@mui/material';
import TableLayout from './TableLayout';
import { TableBody, TableRow as MuiTableRow } from '@mui/material';
import { useTheme } from 'styled-components';

//
//
//

interface TableRendererProps<T> {
  data: T[];
  head: React.ReactNode[];
  repeatCount?: number;
  render: (data: T) => React.ReactNode;
  pagination?: {
    page: number;
    rowsPerPage: number;
    onPageChange: (e: React.ChangeEvent<unknown>, newPage: number) => void;
    count?: number; // 전체 아이템 수 추가
  };
}

//
//
//

const TableContainer = TableLayout.TableContainer;
const TableHead = TableLayout.TableHead;
const TableHeadTableCell = TableLayout.TableCell;
const TableRow = TableLayout.TableRow;
const TablePagination = TableLayout.TablePagination;

const TableRenderer = <T,>({
  data,
  head,
  render,
  repeatCount = 2,
  pagination = {
    page: 1,
    rowsPerPage: Number.MAX_SAFE_INTEGER,
    onPageChange: () => {},
  },
}: TableRendererProps<T>) => {
  const theme = useTheme();
  //
  const arr: T[][] = Array.from({ length: repeatCount }, () => []);

  const paginatedData = data;

  /**
   * 수정 필요 (임시 페이지네이션 구현)
   */
  if (pagination) {
    paginatedData.forEach((item, index) => {
      const rowIndex = Math.floor(index / repeatCount);
      if (arr[rowIndex] === undefined) {
        arr[rowIndex] = [];
      }
      arr[rowIndex].push(item);
    });
  } else {
    data.forEach((data, index) => {
      const rowIndex = Math.floor(index / repeatCount);

      if (arr[rowIndex] === undefined) {
        arr[rowIndex] = [];
      }

      arr[rowIndex].push(data);
    });
  }

  /**
   *
   */
  const renderTableHead = () => {
    return (
      <TableHead>
        <MuiTableRow>
          {Array.from({ length: repeatCount }).map((_, rowIndex) =>
            head.map((item, index) => (
              <TableHeadTableCell key={`head-${rowIndex}-${index}`}>{item}</TableHeadTableCell>
            )),
          )}
        </MuiTableRow>
      </TableHead>
    );
  };

  /**
   *
   */
  const renderTableBody = () => {
    return (
      <TableBody>
        {Array.from({ length: Math.ceil(data.length / repeatCount) }).map((_, rowIndex) => (
          <TableRow key={`body-${rowIndex}`}>
            {arr[rowIndex] && arr[rowIndex].map((item: T) => render(item))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  /**
   *
   * @returns
   */
  const renderTablePagination = () => {
    const totalItems = pagination.count !== undefined ? pagination.count : data.length;

    return (
      <Stack alignItems="center" mt={'6rem'}>
        <TablePagination
          count={totalItems} // 전체 아이템 수 전달
          page={pagination.page}
          onChange={pagination.onPageChange}
          shape="rounded"
        />
      </Stack>
    );
  };

  //
  //
  //

  return (
    <>
      <TableContainer>
        <Table sx={{ backgroundColor: `${theme.colors.const.white} !important` }}>
          {renderTableHead()}
          {renderTableBody()}
        </Table>
      </TableContainer>
      {pagination.rowsPerPage !== Number.MAX_SAFE_INTEGER && renderTablePagination()}
    </>
  );
};

export default TableRenderer;
