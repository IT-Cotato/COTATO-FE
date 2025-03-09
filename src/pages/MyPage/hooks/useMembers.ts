import { useRef } from 'react';
import { CotatoPageMemberResponse, FindMembersByStatusRequest } from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';

//
//
//

type UseMemberParams = FindMembersByStatusRequest;

interface UseMemberReturn {
  members: CotatoPageMemberResponse | undefined;
  isMembersLoading: boolean;
  isMembersError: any;
  mutateMembers: () => void;
}

//
//
//

export const useMembers = (params: UseMemberParams) => {
  const _return = useRef<UseMemberReturn>({} as UseMemberReturn);

  //
  const { data, isLoading, error, mutate } = useSWR<CotatoPageMemberResponse>(
    ['/v1/api/member', params],
    ([url, params]) => fetcherWithParams(url, params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  //
  //
  //

  _return.current.members = data ?? undefined;
  _return.current.isMembersLoading = isLoading;
  _return.current.isMembersError = error;
  _return.current.mutateMembers = mutate;

  return _return.current;
};
