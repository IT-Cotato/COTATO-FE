import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { STATUS_ASSETS } from '../constants';
import { useAttendancesRecords } from '../hooks/useAttendancesRecords';
import styled from 'styled-components';

//
//
//

const NAME_FIELD = [
  { icon: null, text: '이름', status: 'name' },
] as unknown as typeof STATUS_ASSETS;

const TABLE_HEAD = NAME_FIELD.concat(STATUS_ASSETS);

//
//
//

const AttendanceReportAllTable = () => {
  //
  const { generationId } = useParams<{ generationId: string }>();

  //
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  //
  const { attendancesRecords, filteredAttendancesRecords } = useAttendancesRecords({
    generationId,
    name: search,
  });

  //
  const [currentRecords, setCurrentRecords] = React.useState(attendancesRecords);

  /**
   *
   */
  const renderTableHead = () => {
    return (
      <StyledTableHead>
        <TableRow>
          {TABLE_HEAD.map((head) => (
            <StyledTableCell key={head.status}>
              <Stack direction="row" gap="0.25rem" alignItems="center" justifyContent="center">
                {head.icon}
                {head.text}
              </Stack>
            </StyledTableCell>
          ))}
        </TableRow>
      </StyledTableHead>
    );
  };

  /**
   *
   */
  const renderTableBody = () => {
    return (
      <TableBody>
        {currentRecords?.map((record) => (
          <StyledTableRow key={record.memberInfo?.memberId}>
            <StyledTableCell>{record.memberInfo?.name}</StyledTableCell>
            <StyledTableCell>{record.statistic?.online}</StyledTableCell>
            <StyledTableCell>{record.statistic?.offline}</StyledTableCell>
            <StyledTableCell>{record.statistic?.late}</StyledTableCell>
            <StyledTableCell>{record.statistic?.absent}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    );
  };

  //
  // if search exists, set filtered records
  //
  useEffect(() => {
    if (search) {
      setCurrentRecords(filteredAttendancesRecords);
      return;
    }

    setCurrentRecords(attendancesRecords);
  }, [search, attendancesRecords, filteredAttendancesRecords]);

  //
  //
  //

  return (
    <StyledTableContainer>
      <Table>
        {renderTableHead()}
        {renderTableBody()}
      </Table>
    </StyledTableContainer>
  );
};

export default AttendanceReportAllTable;

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

const StyledTableCell = styled(CenterAlignedTableCell)`
  width: 20%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary60} !important;
`;
