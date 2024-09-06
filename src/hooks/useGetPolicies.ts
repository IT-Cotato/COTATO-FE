import fetcher from '@utils/fetcher';
import { CotatoPoliciesResponse, CotatoPolicyInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseGetPoliciesReturn {
  policies: CotatoPolicyInfoResponse[];
  isPoliciesLoading: boolean;
  isPoliciesError: any;
}

//
//
//

export function useGetPolicies() {
  const _return = useRef<UseGetPoliciesReturn>({} as UseGetPoliciesReturn);

  const {
    data: policiesData,
    isLoading: isPoliciesLoading,
    error: isPoliciesError,
  } = useSWR<CotatoPoliciesResponse>('/v2/api/policies', fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  _return.current = {
    policies: policiesData?.policies || [],
    isPoliciesLoading,
    isPoliciesError,
  };

  return _return.current;
}
