import { useRef } from 'react';
import { CotatoAttendanceMemberInfo, CotatoAttendanceStatistic } from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

//
//
//

interface UseAttendancesRecordsParams {
  generationId?: string;
  name?: string;
}

export interface CotatoAttendanceRecordsGenerationResponse {
  memberInfo: CotatoAttendanceMemberInfo;
  statistic: CotatoAttendanceStatistic;
}

interface UseAttendancesRecordsReturn {
  attendancesRecords: CotatoAttendanceRecordsGenerationResponse[] | [];
  filteredAttendancesRecords: CotatoAttendanceRecordsGenerationResponse[] | [];
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
  } = useSWR<CotatoAttendanceRecordsGenerationResponse[]>(
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
