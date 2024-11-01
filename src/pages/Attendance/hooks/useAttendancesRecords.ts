import { useRef } from 'react';
import { CotatoAttendanceRecordResponse } from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

//
//
//

interface UseAttendancesRecordsParams {
  generationId?: string;
  name?: string;
}

interface UseAttendancesRecordsReturn {
  attendancesRecords: CotatoAttendanceRecordResponse[] | [];
  filteredAttendancesRecords: CotatoAttendanceRecordResponse[] | [];
  isAttendancesRecordsLoading: boolean;
  isAttendancesRecordsError: boolean;
  mutateAttendancesRecords: () => void;
}

//
//
//

export const useAttendancesRecords = ({
  generationId,
  name,
}: UseAttendancesRecordsParams): UseAttendancesRecordsReturn => {
  const _return = useRef<UseAttendancesRecordsReturn>({} as UseAttendancesRecordsReturn);

  //
  const {
    data: attendancesRecords,
    isLoading: isAttendancesRecordsLoading,
    error: isAttendancesRecordsError,
    mutate: mutateAttendancesRecords,
  } = useSWR<CotatoAttendanceRecordResponse[]>(
    `/v2/api/attendances/records?generationId=${generationId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const filteredAttendancesRecords = attendancesRecords?.filter(
    (record) => record.memberInfo?.name?.toLowerCase().includes(name?.toLowerCase() ?? '') ?? false,
  );

  //
  //
  //

  _return.current.attendancesRecords = attendancesRecords ?? [];
  _return.current.filteredAttendancesRecords = filteredAttendancesRecords ?? [];
  _return.current.isAttendancesRecordsLoading = isAttendancesRecordsLoading;
  _return.current.isAttendancesRecordsError = isAttendancesRecordsError;
  _return.current.mutateAttendancesRecords = mutateAttendancesRecords;

  return _return.current;
};
