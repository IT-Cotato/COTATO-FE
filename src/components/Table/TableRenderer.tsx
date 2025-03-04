import React from 'react';
import { Table } from '@mui/material';
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
}

//
//
//

const TableContainer = TableLayout.TableContainer;
const TableHead = TableLayout.TableHead;
const TableHeadTableCell = TableLayout.TableCell;
const TableRow = TableLayout.TableRow;

const TableRenderer = <T,>({ data, head, render, repeatCount = 2 }: TableRendererProps<T>) => {
  const theme = useTheme();

  //
  const arr: T[][] = Array.from({ length: repeatCount }, () => []);

  //
  data.forEach((data, index) => {
    const rowIndex = Math.floor(index / repeatCount);

    if (arr[rowIndex] === undefined) {
      arr[rowIndex] = [];
    }

    arr[rowIndex].push(data);
  });

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

  //
  //
  //

  return (
    <TableContainer>
      <Table sx={{ backgroundColor: `${theme.colors.const.white} !important` }}>
        {renderTableHead()}
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default TableRenderer;
