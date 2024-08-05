import fetcher from '@utils/fetcher';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseGenerationReturn {
  generationId: CotatoGenerationInfoResponse['generationId'];
  generationNumber: CotatoGenerationInfoResponse['generationNumber'];
  sessionCount: CotatoGenerationInfoResponse['sessionCount'];
  isGenerationLoading: boolean;
  isGenerationError: any;
}

//
//
//

export function useGeneration() {
  const _return = useRef<UseGenerationReturn>({} as UseGenerationReturn);

  const { data, isLoading, error } = useSWR<CotatoGenerationInfoResponse[]>(
    '/v1/api/generation',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const currentGeneration = data?.at(-1);

  _return.current = {
    generationId: currentGeneration?.generationId,
    generationNumber: currentGeneration?.generationNumber,
    sessionCount: currentGeneration?.sessionCount,
    isGenerationLoading: isLoading,
    isGenerationError: error,
  };

  return _return.current;
}
