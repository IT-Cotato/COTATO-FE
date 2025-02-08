import React from 'react';
import { TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';
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
  background-color: ${({ theme }) => theme.colors.common.white_const};
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

export default Object.assign(
  {},
  {
    TableContainer: StyledTableContainer,
    TableHead: StyledTableHead,
    TableRow: StyledTableRow,
    TableCell: StyledTableCell,
    TableHeadTableCell: StyledTableCell,
  },
);
