import { Stack, Table, TableBody, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { STATUS_ASSETS } from '../constants';
import { useAttendancesRecords } from '../hooks/useAttendancesRecords';

import AttedanceTableLayout from './components/AttedanceTableLayout';

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
      <AttedanceTableLayout.TableHead>
        <TableRow>
          {TABLE_HEAD.map((head) => (
            <AttedanceTableLayout.TableHeadTableCell key={head.status}>
              <Stack direction="row" gap="0.25rem" alignItems="center" justifyContent="center">
                {head.icon}
                {head.text}
              </Stack>
            </AttedanceTableLayout.TableHeadTableCell>
          ))}
        </TableRow>
      </AttedanceTableLayout.TableHead>
    );
  };

  /**
   *
   */
  const renderTableBody = () => {
    return (
      <TableBody>
        {currentRecords?.map((record) => (
          <AttedanceTableLayout.TableRow key={record.memberInfo?.memberId}>
            <AttedanceTableLayout.TableCell>
              {record.memberInfo?.name}
            </AttedanceTableLayout.TableCell>

            <AttedanceTableLayout.TableCell>
              {record.statistic?.online}
            </AttedanceTableLayout.TableCell>

            <AttedanceTableLayout.TableCell>
              {record.statistic?.offline}
            </AttedanceTableLayout.TableCell>

            <AttedanceTableLayout.TableCell>
              {record.statistic?.late}
            </AttedanceTableLayout.TableCell>

            <AttedanceTableLayout.TableCell>
              {record.statistic?.absent}
            </AttedanceTableLayout.TableCell>
          </AttedanceTableLayout.TableRow>
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
    <AttedanceTableLayout.TableContainer>
      <Table>
        {renderTableHead()}
        {renderTableBody()}
      </Table>
    </AttedanceTableLayout.TableContainer>
  );
};

export default AttendanceReportAllTable;
