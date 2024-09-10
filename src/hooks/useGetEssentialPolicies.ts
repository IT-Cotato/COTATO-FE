import fetcher from '@utils/fetcher';
import { CotatoPolicyInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseGetEssentialPoliciesReturn {
  essentialPolicies: CotatoPolicyInfoResponse[];
  isPoliciesLoading: boolean;
  isPoliciesError: any;
}

interface UseGetEssentialPoliciesResponse {
  memberId: number;
  essentialPolicies: [
    {
      policyId: number;
      type: 'ESSENTIAL';
      title: 'string';
      content: 'string';
    },
  ];
  optionalPolicies: [
    {
      policyId: number;
      type: 'OPTIONAL';
      title: 'string';
      content: 'string';
    },
  ];
}

//
//
//

export function useGetEssentialPolicies() {
  const _return = useRef<UseGetEssentialPoliciesReturn>({} as UseGetEssentialPoliciesReturn);

  const {
    data: policiesData,
    isLoading: isPoliciesLoading,
    error: isPoliciesError,
  } = useSWR<UseGetEssentialPoliciesResponse>('/v2/api/policies/essential', fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  _return.current = {
    essentialPolicies: policiesData?.essentialPolicies || [],
    isPoliciesLoading,
    isPoliciesError,
  };

  return _return.current;
}
