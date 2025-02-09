import fetcher from '@utils/fetcher';
import { CotatoPoliciesResponse, CotatoPolicyInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

type UncheckedPolicies = {
  memberId: number;
  essentialPolicies: CotatoPolicyInfoResponse[];
  optionalPolicies: CotatoPolicyInfoResponse[];
};

interface UseGetPoliciesUncheckedReturn {
  // TODO: CANNOT USE TYPE becauseof mypage sprint, so manually typing
  uncheckedPolicies: UncheckedPolicies | undefined;
  isUncheckedPoliciesLoading: boolean;
  isUncheckedPoliciesError: any;
}

//
//
//

export function useGetPoliciesUnchecked() {
  const _return = useRef<UseGetPoliciesUncheckedReturn>({} as UseGetPoliciesUncheckedReturn);

  const {
    data: uncheckedPoliciesData,
    isLoading: isUncheckedPoliciesLoading,
    error: isUncheckedPoliciesError,
  } = useSWR<UncheckedPolicies>(
    '/v2/api/policies/unchecked?category=PERSONAL_INFORMATION',
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  _return.current = {
    uncheckedPolicies: uncheckedPoliciesData,
    isUncheckedPoliciesLoading,
    isUncheckedPoliciesError,
  };

  return _return.current;
}
