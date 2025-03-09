import React, { useEffect } from 'react';
import { Stack, Table, TableBody, TableRow } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { STATUS_ASSETS } from '../constants';
import { useAttendancesRecords } from '../hooks/useAttendancesRecords';
import { TableLayout } from '@components/Table';

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
      <TableLayout.TableHead>
        <TableRow>
          {TABLE_HEAD.map((head) => (
            <TableLayout.TableHeadTableCell key={head.status}>
              <Stack direction="row" gap="0.25rem" alignItems="center" justifyContent="center">
                {head.icon}
                {head.text}
              </Stack>
            </TableLayout.TableHeadTableCell>
          ))}
        </TableRow>
      </TableLayout.TableHead>
    );
  };

  /**
   *
   */
  const renderTableBody = () => {
    return (
      <TableBody>
        {currentRecords?.map((record) => (
          <TableLayout.TableRow key={record.memberInfo?.memberId}>
            <TableLayout.TableCell>{record.memberInfo?.name}</TableLayout.TableCell>

            <TableLayout.TableCell>{record.statistic?.offline}</TableLayout.TableCell>

            <TableLayout.TableCell>{record.statistic?.online}</TableLayout.TableCell>

            <TableLayout.TableCell>{record.statistic?.late}</TableLayout.TableCell>

            <TableLayout.TableCell>{record.statistic?.absent}</TableLayout.TableCell>
          </TableLayout.TableRow>
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
    <TableLayout.TableContainer>
      <Table>
        {renderTableHead()}
        {renderTableBody()}
      </Table>
    </TableLayout.TableContainer>
  );
};

export default AttendanceReportAllTable;
