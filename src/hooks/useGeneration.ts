import fetcher from '@utils/fetcher';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseGenerationParams {
  generationId?: string;
}

interface UseGenerationReturn {
  currentGeneration: CotatoGenerationInfoResponse | undefined;
  targetGeneration: CotatoGenerationInfoResponse | undefined;
  generations: CotatoGenerationInfoResponse[] | undefined;
  isGenerationLoading: boolean;
  isGenerationError: any;
}

//
//
//

export function useGeneration({ generationId }: UseGenerationParams = {}): UseGenerationReturn {
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

  const currentGeneration =
    data && data.sort((a, b) => (b.generationId as number) - (a.generationId as number))[0];

  const targetGeneration = generationId
    ? data?.find((generation) => generation.generationId === Number(generationId))
    : undefined;

  //
  //
  //

  _return.current.currentGeneration = currentGeneration;
  _return.current.targetGeneration = targetGeneration;
  _return.current.generations = data;
  _return.current.isGenerationLoading = isLoading;
  _return.current.isGenerationError = error;

  return _return.current;
}
