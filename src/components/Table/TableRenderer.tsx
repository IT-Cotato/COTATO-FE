import React, { useEffect, useState, useMemo } from 'react';
import { Stack, Table, TableCell } from '@mui/material';
import TableLayout from './TableLayout';
import { TableBody, TableRow as MuiTableRow } from '@mui/material';
import { useTheme } from 'styled-components';
import EmptyResult from '@pages/MyPage/components/common/EmptyResult';

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
  slotProps?: {
    emptyResult?: {
      text?: string;
    };
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
  slotProps,
}: TableRendererProps<T>) => {
  const theme = useTheme();
  const [groupedData, setGroupedData] = useState<T[][]>([]);

  /**
   *
   */
  const renderTableHead = useMemo(() => {
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
  }, [head, repeatCount]);

  /**
   *
   */
  const renderTableBody = useMemo(() => {
    if (!data.length) {
      return (
        <TableCell colSpan={head.length * 2} sx={{ padding: 0 }}>
          <EmptyResult text={slotProps?.emptyResult?.text ?? '데이터가 없습니다.'} border="none" />
        </TableCell>
      );
    }

    const uid = Math.random().toString(36).substring(2, 15);

    return (
      <TableBody>
        {groupedData.map((row, rowIndex) => (
          <TableRow key={`body-${uid}-${rowIndex}`}>{row.map((item) => render(item))}</TableRow>
        ))}
      </TableBody>
    );
  }, [groupedData, render, data.length]);

  /**
   *
   */
  const renderTablePagination = useMemo(() => {
    const showPagination = pagination.rowsPerPage !== Number.MAX_SAFE_INTEGER;

    if (!showPagination) {
      return null;
    }

    const totalItems = pagination.count !== undefined ? pagination.count : data.length;

    return (
      <Stack alignItems="center" mt={'6rem'}>
        <TablePagination
          count={totalItems}
          page={pagination.page}
          onChange={pagination.onPageChange}
          shape="rounded"
        />
      </Stack>
    );
  }, [data.length, pagination]);

  //
  // Group data into rows based on repeatCount
  //
  useEffect(() => {
    const groupDataIntoRows = () => {
      const rowCount = Math.ceil(data.length / repeatCount);
      const rows: T[][] = [];

      for (let i = 0; i < rowCount; i++) {
        const startIndex = i * repeatCount;
        const endIndex = Math.min(startIndex + repeatCount, data.length);
        const row = data.slice(startIndex, endIndex);
        rows.push(row);
      }

      return rows;
    };

    setGroupedData(groupDataIntoRows());
  }, [data, repeatCount]);

  //
  //
  //

  return (
    <>
      <TableContainer>
        <Table sx={{ backgroundColor: `${theme.colors.const.white} !important` }}>
          {renderTableHead}
          {renderTableBody}
        </Table>
      </TableContainer>
      {renderTablePagination}
    </>
  );
};

export default React.memo(TableRenderer) as typeof TableRenderer;
