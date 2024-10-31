import fetcher from '@utils/fetcher';
import { CotatoAttendanceRecordResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseAttendancesAttendanceIdRecordsGetParams {
  attendanceId?: number;
}

interface UseAttendancesAttendanceIdRecordsGetReturn {
  attendancesAttendanceIdRecords: CotatoAttendanceRecordResponse[] | [];
  isAttendancesAttendanceIdRecordsLoading: boolean;
  isAttendancesAttendanceIdRecordsError: boolean;
  mutateAttendancesAttendanceIdRecords: () => void;
}

//
//
//

export const useAttendancesAttendanceIdRecordsGet = ({
  attendanceId,
}: UseAttendancesAttendanceIdRecordsGetParams): UseAttendancesAttendanceIdRecordsGetReturn => {
  const _return = useRef<UseAttendancesAttendanceIdRecordsGetReturn>(
    {} as UseAttendancesAttendanceIdRecordsGetReturn,
  );

  //
  const {
    data: attendancesAttendanceIdRecords,
    isLoading: isAttendancesAttendanceIdRecordsLoading,
    error: isAttendancesAttendanceIdRecordsError,
    mutate: mutateAttendancesAttendanceIdRecords,
  } = useSWR<CotatoAttendanceRecordResponse[]>(
    `/v2/api/attendances/${attendanceId}/records`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  //
  //
  //

  _return.current.attendancesAttendanceIdRecords = attendancesAttendanceIdRecords ?? [];
  _return.current.isAttendancesAttendanceIdRecordsLoading = isAttendancesAttendanceIdRecordsLoading;
  _return.current.isAttendancesAttendanceIdRecordsError = isAttendancesAttendanceIdRecordsError;
  _return.current.mutateAttendancesAttendanceIdRecords = mutateAttendancesAttendanceIdRecords;

  return _return.current;
};
