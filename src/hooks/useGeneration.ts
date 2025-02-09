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
  mutateGenerations: () => void;
  mutateCurrentGeneration: () => void;
}

//
//
//

const MAX_RETRY_COUNT = 5;

//
//
//

export function useGeneration({ generationId }: UseGenerationParams = {}): UseGenerationReturn {
  const _return = useRef<UseGenerationReturn>({} as UseGenerationReturn);

  const {
    data: generationData,
    isLoading: isGenerationLoading,
    error: isGenerationError,
    mutate: mutateGenerations,
  } = useSWR<CotatoGenerationInfoResponse[]>('/v1/api/generations', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    errorRetryCount: MAX_RETRY_COUNT,
  });

  const {
    data: currentGenerationData,
    isLoading: isCurrentGenerationLoading,
    error: currentGenerationError,
    mutate: mutateCurrentGeneration,
  } = useSWR<CotatoGenerationInfoResponse>('/v1/api/generations/current', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    errorRetryCount: MAX_RETRY_COUNT,
  });

  const currentGeneration = currentGenerationData;

  const targetGeneration = generationId
    ? generationData?.find((generation) => generation.generationId === Number(generationId))
    : undefined;

  //
  //
  //

  _return.current.currentGeneration = currentGeneration;
  _return.current.targetGeneration = targetGeneration;
  _return.current.generations = generationData;
  _return.current.isGenerationLoading = isGenerationLoading || isCurrentGenerationLoading;
  _return.current.isGenerationError = isGenerationError || currentGenerationError;
  _return.current.mutateGenerations = mutateGenerations;
  _return.current.mutateCurrentGeneration = mutateCurrentGeneration;

  return _return.current;
}
