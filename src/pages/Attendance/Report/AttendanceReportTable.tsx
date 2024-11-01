import { useGeneration } from '@/hooks/useGeneration';
import useGetAttendances from '@/hooks/useGetAttendances';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useAttendancesAttendanceIdRecordsGet } from '../hooks/useAttendancesAttendanceIdRecordsGet';
import { useSession } from '@/hooks/useSession';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import AttedanceTableLayout from './components/AttedanceTableLayout';
import { getCurrentStatistic } from '../utils/util';
import AttendanceStatusDropdown from './components/AttendanceStatusDropdown';
import { useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

//
//
//

const TABLE_HEAD = ['이름', '출석 상태'];

//
//
//

const AttendanceReportTable = () => {
  const { isMobileOrSmaller } = useBreakpoints();

  const [searchParams] = useSearchParams();
  const status = searchParams.getAll('status') ?? [];
  const search = searchParams.get('search') || '';

  //
  const { currentGeneration } = useGeneration();

  const { generationId } = useParams();
  const { sessionId } = useParams();

  // TODO: need to get the latest session by params
  const { sessions } = useSession({ generationId: currentGeneration?.generationId });

  //
  // const { currentAttendance } = useGetAttendances({
  //   sessionId: sessions?.at(-1)?.sessionId,
  //   generationId: currentGeneration?.generationId,
  // });

  //
  const { currentAttendance } = useGetAttendances({
    sessionId: Number(sessionId),
    generationId: Number(generationId),
  });

  //
  const attendanceId = currentAttendance?.attendanceId;

  //
  const { attendancesAttendanceIdRecords } = useAttendancesAttendanceIdRecordsGet({
    attendanceId: attendanceId ?? 0,
  });

  //
  const [currentRecords, setCurrentRecords] = React.useState(attendancesAttendanceIdRecords);

  /**
   *
   */
  const renderTableHead = () => {
    if (isMobileOrSmaller) {
      return (
        <TableRow>
          {TABLE_HEAD.map((head) => (
            <AttedanceTableLayout.TableHeadTableCell key={head}>
              {head}
            </AttedanceTableLayout.TableHeadTableCell>
          ))}
        </TableRow>
      );
    }

    return (
      <TableRow>
        {TABLE_HEAD.map((head) => (
          <>
            <AttedanceTableLayout.TableHeadTableCell key={head}>
              {head}
            </AttedanceTableLayout.TableHeadTableCell>
          </>
        ))}
        {TABLE_HEAD.map((head) => (
          <>
            <AttedanceTableLayout.TableHeadTableCell key={head}>
              {head}
            </AttedanceTableLayout.TableHeadTableCell>
          </>
        ))}
      </TableRow>
    );
  };

  /**
   *
   */
  const renderEmptyTableCell = () => {
    return (
      <>
        <TableCell />
        <TableCell />
      </>
    );
  };

  /**
   *
   */
  const renderTableBody = () => {
    if (isMobileOrSmaller) {
      return currentRecords?.map((record) => (
        <>
          <AttedanceTableLayout.TableRow key={uuid()}>
            <AttedanceTableLayout.TableCell>
              {record.memberInfo?.name}
            </AttedanceTableLayout.TableCell>
            <AttedanceTableLayout.TableCell>
              <AttendanceStatusDropdown
                status={getCurrentStatistic(record)}
                memberId={record?.memberInfo?.memberId}
                attendanceId={attendanceId}
              />
            </AttedanceTableLayout.TableCell>
          </AttedanceTableLayout.TableRow>
        </>
      ));
    }

    return Array.from({ length: Math.ceil(currentRecords?.length / 2) }, (_, i) => {
      const firstRecord = currentRecords[i * 2];
      const secondRecord = currentRecords?.[i * 2 + 1];

      return (
        <AttedanceTableLayout.TableRow key={uuid()}>
          <AttedanceTableLayout.TableCell>
            {firstRecord?.memberInfo?.name}
          </AttedanceTableLayout.TableCell>
          <AttedanceTableLayout.TableCell>
            <AttendanceStatusDropdown
              status={getCurrentStatistic(firstRecord)}
              memberId={firstRecord?.memberInfo?.memberId}
              attendanceId={attendanceId}
            />
          </AttedanceTableLayout.TableCell>
          {secondRecord ? (
            <>
              <AttedanceTableLayout.TableCell>
                {secondRecord?.memberInfo?.name}
              </AttedanceTableLayout.TableCell>
              <AttedanceTableLayout.TableCell>
                <AttendanceStatusDropdown
                  status={getCurrentStatistic(secondRecord)}
                  memberId={secondRecord?.memberInfo?.memberId}
                  attendanceId={attendanceId}
                />
              </AttedanceTableLayout.TableCell>
            </>
          ) : (
            renderEmptyTableCell()
          )}
        </AttedanceTableLayout.TableRow>
      );
    });
  };

  //
  //
  //
  useEffect(() => {
    if (!attendancesAttendanceIdRecords) {
      return;
    }

    let filteredRecords = attendancesAttendanceIdRecords;

    // filter records by search
    if (search) {
      filteredRecords = filteredRecords?.filter((record) =>
        record.memberInfo?.name?.toLowerCase().includes(search.toLowerCase()),
      );

      console.log(filteredRecords);

      setCurrentRecords(filteredRecords);
    }

    // filter records by status
    if (status.length) {
      filteredRecords = filteredRecords?.filter((record) =>
        status.some((status) =>
          getCurrentStatistic(record).toLowerCase().includes(status.toLowerCase()),
        ),
      );

      setCurrentRecords(filteredRecords);

      return;
    }

    if (!search && !status.length) {
      setCurrentRecords(attendancesAttendanceIdRecords);
    }
  }, [status.length, attendancesAttendanceIdRecords, search]);

  //
  //
  //

  return (
    <AttedanceTableLayout.TableContainer>
      <Table>
        <AttedanceTableLayout.TableHead>{renderTableHead()}</AttedanceTableLayout.TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </AttedanceTableLayout.TableContainer>
  );
};

export default AttendanceReportTable;
