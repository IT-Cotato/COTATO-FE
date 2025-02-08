import { CotatoChangeGenerationPeriodRequest } from 'cotato-openapi-clients';
import useSWR, { mutate as globalMutate } from 'swr';
import api, { CotatoApiErrorResponse, CotatoApiResponse } from '@/api/api';
import { toast } from 'react-toastify';

//
//
//

interface UseGenerationsPeriodPatchMutateParams {
  generationId: number;
}

//
//
//

export const useGenerationsPeriodPatchMutation = ({
  generationId,
}: UseGenerationsPeriodPatchMutateParams) => {
  // Define your patch request function separately
  const patchGenerationPeriod = async (
    generationId: number,
    data: CotatoChangeGenerationPeriodRequest,
  ) => {
    const response = await api.patch(`/v1/api/generations/${generationId}/period`, data);
    return response.data;
  };

  const mutateGenerationsPeriodPatch = async (data: CotatoChangeGenerationPeriodRequest) => {
    try {
      await patchGenerationPeriod(generationId, data);

      await globalMutate(`/v1/api/generations/${generationId}/period`).then(() => {
        toast.success('기수 정보 수정 완료');
      });
    } catch (err) {
      const errorResponse = err as CotatoApiResponse<CotatoApiErrorResponse>;

      // Safely check if `errorResponse` contains the expected fields
      if (errorResponse?.response?.data?.message) {
        toast.error(errorResponse.response.data.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return { mutateGenerationsPeriodPatch };
};
