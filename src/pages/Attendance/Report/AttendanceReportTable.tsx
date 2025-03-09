import React, { useEffect } from 'react';
import useGetAttendances from '@/hooks/useGetAttendances';
import { useAttendancesAttendanceIdRecordsGet } from '../hooks/useAttendancesAttendanceIdRecordsGet';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import AttendanceStatusDropdown from './components/AttendanceStatusDropdown';
import { useParams, useSearchParams } from 'react-router-dom';
import { TableLayout, TableRenderer } from '@components/Table';

//
//
//

const TABLE_HEAD = ['이름', '출석 상태'];

//
//
//

const AttendanceReportTable = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  const [searchParams] = useSearchParams();
  const status = searchParams.getAll('status') ?? [];
  const search = searchParams.get('search') || '';

  //
  const { generationId } = useParams();
  const { sessionId } = useParams();

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

      setCurrentRecords(filteredRecords);
    }

    // filter records by status
    if (status.length) {
      filteredRecords = filteredRecords?.filter((record) =>
        status.some((status) => record.result?.toLowerCase().includes(status.toLowerCase())),
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
    <TableRenderer
      head={TABLE_HEAD}
      data={currentRecords}
      repeatCount={isLandScapeOrSmaller ? 1 : 2}
      render={(record) => (
        <>
          <TableLayout.TableCell>{record.memberInfo?.name}</TableLayout.TableCell>
          <TableLayout.TableCell>
            <AttendanceStatusDropdown
              status={record.result}
              memberId={record?.memberInfo?.memberId}
              attendanceId={attendanceId}
            />
          </TableLayout.TableCell>
        </>
      )}
    />
  );
};

export default AttendanceReportTable;
