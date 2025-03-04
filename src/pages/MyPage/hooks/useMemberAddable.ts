import { useRef } from 'react';
import {
  CotatoAddableMemberInfo,
  FindAddableMembersForGenerationMemberRequest,
} from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';

//
//
//

type UseMemberAddableParams = FindAddableMembersForGenerationMemberRequest;

type UseAddableMemberResponse = {
  memberInfos: CotatoAddableMemberInfo[];
};

interface UseMemberAddableReturn {
  addableMembers: UseAddableMemberResponse | undefined;
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

  _return.current.addableMembers = data ?? undefined;
  _return.current.isAddableMembersLoading = isLoading;
  _return.current.isAddableMembersError = error;
  _return.current.mutateAddableMembers = mutate;

  return _return.current;
};
