import { useRef } from 'react';
import { CotatoGenerationMemberInfoResponse } from 'cotato-openapi-clients';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';

//
//
//

interface UseGenerationMembersParams {
  generationId?: number;
}

interface UseGenerationMembersReturn {
  generationMemberInfos: CotatoGenerationMemberInfoResponse['generationMemberInfos'] | undefined;
  isGenerationMemberInfosLoading: boolean;
  isGenerationMemberInfosError: any;
  mutateGenerationMemberInfos: () => void;
}

//
//
//

export const useGenerationMembers = ({ generationId }: UseGenerationMembersParams) => {
  const _return = useRef<UseGenerationMembersReturn>({} as UseGenerationMembersReturn);

  //
  const { data, isLoading, error, mutate } = useSWR<CotatoGenerationMemberInfoResponse>(
    '/v2/api/generation-members',
    (url) => fetcherWithParams(url, { generationId }),
    {
      revalidateOnFocus: false,
    },
  );

  //
  //
  //

  _return.current.generationMemberInfos = data?.generationMemberInfos;
  _return.current.isGenerationMemberInfosLoading = isLoading;
  _return.current.isGenerationMemberInfosError = error;
  _return.current.mutateGenerationMemberInfos = mutate;

  return _return.current;
};
