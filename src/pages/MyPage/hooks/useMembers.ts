import { useRef } from 'react';
import {
  CotatoAddableMemberInfo,
  FindAddableMembersForGenerationMember1Request,
} from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';

//
//
//

type UseMemberParams = FindAddableMembersForGenerationMember1Request;

interface UseMemberReturn {
  members: CotatoAddableMemberInfo[] | undefined;
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
  const { data, isLoading, error, mutate } = useSWR<CotatoAddableMemberInfo[]>(
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

  _return.current.members = data ?? [];
  _return.current.isMembersLoading = isLoading;
  _return.current.isMembersError = error;
  _return.current.mutateMembers = mutate;

  return _return.current;
};
