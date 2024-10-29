import { useRef } from 'react';
import fetcherWithParams from '@utils/fetcherWithParams';
import {
  CotatoAttendanceRecordResponse,
  CotatoMemberAttendanceRecordsResponse,
} from 'cotato-openapi-clients';
import useSWR from 'swr';

//
//
//

interface UseAttendancesRecordsMembersParams {
  generationId?: string;
}

interface UseAttendancesRecordsMembersReturn {
  attendancesRecordsMembers: CotatoMemberAttendanceRecordsResponse['memberAttendResponses'] | [];
  isAttendancesRecordsMembersLoading: boolean;
  isAttendancesRecordsMembersError: boolean;
  mutateAttendancesRecordsMembers: () => void;
}

//
//
//

export const useAttendancesRecordsMembers = ({
  generationId,
}: UseAttendancesRecordsMembersParams): UseAttendancesRecordsMembersReturn => {
  const _return = useRef<UseAttendancesRecordsMembersReturn>(
    {} as UseAttendancesRecordsMembersReturn,
  );

  //
  const {
    data,
    isLoading: isAttendancesRecordsMembersLoading,
    error: isAttendancesRecordsMembersError,
    mutate: mutateAttendancesRecordsMembers,
  } = useSWR<CotatoMemberAttendanceRecordsResponse>(
    '/v2/api/attendances/records/members',
    (url: string) => fetcherWithParams(url, { generationId }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  //
  //
  //

  _return.current.attendancesRecordsMembers = data?.memberAttendResponses ?? [];
  _return.current.isAttendancesRecordsMembersLoading = isAttendancesRecordsMembersLoading;
  _return.current.isAttendancesRecordsMembersError = isAttendancesRecordsMembersError;
  _return.current.mutateAttendancesRecordsMembers = mutateAttendancesRecordsMembers;

  return _return.current;
};
