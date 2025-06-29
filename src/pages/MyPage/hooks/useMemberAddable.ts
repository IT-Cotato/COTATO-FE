import { useRef } from 'react';
import {
  CotatoMemberInfoResponse,
  FindAddableMembersForGenerationMemberRequest,
} from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';

//
//
//

type UseMemberAddableParams = FindAddableMembersForGenerationMemberRequest;

type UseAddableMemberResponse = {
  memberInfos: CotatoMemberInfoResponse[];
};

interface UseMemberAddableReturn {
  addableMembers: UseAddableMemberResponse;
  isAddableMembersLoading: boolean;
  isAddableMembersError: any;
  mutateAddableMembers: () => void;
}

//
//
//

export const useMemberAddable = (params: UseMemberAddableParams) => {
  const _return = useRef<UseMemberAddableReturn>({} as UseMemberAddableReturn);

  //
  const { data, isLoading, error, mutate } = useSWR<UseAddableMemberResponse>(
    ['/v1/api/member/addable', params],
    ([url, params]) => fetcherWithParams(url, params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  //
  //
  //

  _return.current.addableMembers = data ?? ({ memberInfos: [] } as UseAddableMemberResponse);
  _return.current.isAddableMembersLoading = isLoading;
  _return.current.isAddableMembersError = error;
  _return.current.mutateAddableMembers = mutate;

  return _return.current;
};
