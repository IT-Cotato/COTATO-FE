import React from 'react';
import {
  Pagination,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from 'styled-components';

//
//
//

const StyledTableContainer = styled(TableContainer)`
  border: 1px solid ${({ theme }) => theme.colors.primary60};
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.colors.pastelTone.yellow[100]};
`;

const StyledTableRow = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.const.white};
`;

/**
 *
 */
const CenterAlignedTableCell: React.FC<TableCellProps> = ({ children, ...props }) => {
  return (
    <TableCell {...props} align="center">
      {children}
    </TableCell>
  );
};

const StyledTableCell = styled(CenterAlignedTableCell)<{ width?: string }>`
  width: ${({ width }) => (width ? width : '20%')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary60} !important;
`;

const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    margin: 0 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray60};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.common.black};

    &.Mui-selected {
      background-color: ${({ theme }) => theme.colors.primary100_1};
      color: ${({ theme }) => theme.colors.common.black};
      border-color: ${({ theme }) => theme.colors.primary80};
    }

    &.Mui-selected:hover {
      background-color: ${({ theme }) => theme.colors.primary100_1};
    }
  }
`;

export default Object.assign(
  {},
  {
    TableContainer: StyledTableContainer,
    TableHead: StyledTableHead,
    TableRow: StyledTableRow,
    TableCell: StyledTableCell,
    TableHeadTableCell: StyledTableCell,
    TablePagination: StyledPagination,
  },
);
