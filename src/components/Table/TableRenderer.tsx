import React from 'react';
import { Stack, Table } from '@mui/material';
import TableLayout from './TableLayout';
import { TableBody, TableRow as MuiTableRow } from '@mui/material';

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
  //
  const arr: T[][] = Array.from({ length: repeatCount }, () => []);

  const getCurrentPageData = () => {
    const start = (pagination.page - 1) * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    return data.slice(start, end);
  };

  const paginatedData = getCurrentPageData();

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
    return (
      <Stack alignItems="center" mt={'6rem'}>
        <TablePagination
          count={Math.ceil(data.length / pagination.rowsPerPage)}
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
        <Table>
          {renderTableHead()}
          {renderTableBody()}
        </Table>
      </TableContainer>
      {pagination.rowsPerPage !== Number.MAX_SAFE_INTEGER && renderTablePagination()}
    </>
  );
};

export default TableRenderer;
