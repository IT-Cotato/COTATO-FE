import fetcher from '@utils/fetcher';
import {
  CotatoAttendancesResponse,
  CotatoAttendanceWithSessionResponse,
} from 'cotato-openapi-clients';
import React from 'react';
import useSWR from 'swr';

//
//
//

interface UseGetAttendancesProps {
  sessionId?: number;
  generationId?: number;
}

interface UseGetAttendancesReturn {
  attendances: CotatoAttendancesResponse | undefined;
  currentAttendance: CotatoAttendanceWithSessionResponse | undefined;
  isAttendanceLoading: boolean;
  isAttendanceError: any;
}

//
//
//

const useGetAttendances = ({ sessionId, generationId }: UseGetAttendancesProps) => {
  const _return = React.useRef<UseGetAttendancesReturn>({} as UseGetAttendancesReturn);

  const { data, isLoading, error } = useSWR<CotatoAttendancesResponse>(
    `/v2/api/attendances?generationId=${generationId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryInterval: 1000,
      errorRetryCount: 3,
    },
  );

  const attendances = data;
  const isAttendanceLoading = isLoading;
  const isAttendanceError = error;

  const currentAttendance = attendances?.attendances
    ? attendances?.attendances.find((attendance) => attendance.sessionId === sessionId)
    : undefined;

  _return.current = {
    attendances,
    currentAttendance,
    isAttendanceLoading,
    isAttendanceError,
  };

  return _return.current;
};

export default useGetAttendances;
