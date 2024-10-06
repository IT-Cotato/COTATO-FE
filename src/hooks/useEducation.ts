import fetcherWithParams from '@utils/fetcherWithParams';
import { CotatoAllEducationResponse } from 'cotato-openapi-clients';

import { useRef } from 'react';
import useSWR from 'swr';

//
//
//

interface UseEducationParams {
  generationId: number;
  educationId?: string;
}

interface UseEducationReturn {
  targetEducation: CotatoAllEducationResponse | undefined;
  educations: CotatoAllEducationResponse[] | undefined;
  isEducationLoading: boolean;
  isEducationError: any;
}

//
//
//

export function useEducation({
  generationId,
  educationId,
}: UseEducationParams): UseEducationReturn {
  const _return = useRef<UseEducationReturn>({} as UseEducationReturn);

  if (!generationId) {
    throw new Error('generationId is required');
  }

  const { data, isLoading, error } = useSWR<CotatoAllEducationResponse[]>(
    '/v1/api/education',
    (url) => fetcherWithParams(url, { generationId }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const targetEducation = educationId
    ? data?.find((education) => education.educationId === Number(educationId))
    : undefined;

  //
  //
  //

  _return.current.targetEducation = targetEducation;
  _return.current.educations = data;
  _return.current.isEducationLoading = isLoading;
  _return.current.isEducationError = error;

  return _return.current;
}
