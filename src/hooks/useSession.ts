import fetcher from '@utils/fetcher';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';

import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseSessionProps {
  generationId?: number;
}

interface UseSessionReturn {
  sessions: CotatoSessionListResponse[] | undefined;
  isSessionLoading: boolean;
  isSessionError: any;
}

//
//
//

export function useSession({ generationId }: UseSessionProps) {
  const _return = useRef<UseSessionReturn>({} as UseSessionReturn);

  const { data, isLoading, error } = useSWR<CotatoSessionListResponse[]>(
    `/v1/api/session?generationId=${generationId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  _return.current = {
    sessions: data || [],
    isSessionLoading: isLoading,
    isSessionError: error,
  };

  return _return.current;
}
