import useSWR from 'swr';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import fetcher from '@utils/fetcher';

//
//
//

interface UseUserReturn {
  user: CotatoMemberInfoResponse | undefined;
  isUserLoading: boolean;
  isUserError: boolean;
  mutateUser: () => void;
}

//
//
//

export default function useUser() {
  const _return = useRef<UseUserReturn>({} as UseUserReturn);

  const {
    data: user,
    isLoading,
    mutate,
    error,
  } = useSWR<CotatoMemberInfoResponse>('/v1/api/member/info', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 6000000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 400) return;
      if (retryCount >= 10) return;
    },
  });

  //
  //
  //

  _return.current.user = user || undefined;
  _return.current.isUserLoading = isLoading;
  _return.current.isUserError = error;
  _return.current.mutateUser = mutate;

  return _return.current;
}
