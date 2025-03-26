import { useRef } from 'react';
import api from '@/api/api';
import {
  CotatoCreateGenerationMemberRequest,
  CotatoUpdateGenerationMemberRoleRequest,
} from 'cotato-openapi-clients';
import useSWRMutation from 'swr/mutation';

//
//
//

type UseGenerationMembersMutationParams = {
  onSuccessPost?: () => void;
  onErrorPost?: () => void;
  onSuccessDelete?: () => void;
  onErrorDelete?: () => void;
  onSuccessPatch?: () => void;
  onErrorPatch?: () => void;
};

type UseGenerationMembersMutationReturn = {
  post: (params: CotatoCreateGenerationMemberRequest) => void;
  patch: (params: CotatoUpdateGenerationMemberRoleRequest) => void;
  delete: (params: { generationMemberId: number }) => void;
  isMutating: boolean;
  error: any;
};

//
//
//

export const useGenerationMembersMutation = (params: UseGenerationMembersMutationParams) => {
  const _return = useRef<UseGenerationMembersMutationReturn>(
    {} as UseGenerationMembersMutationReturn,
  );
  //
  //
  const {
    trigger: postTrigger,
    isMutating: isPostMutating,
    error: postError,
  } = useSWRMutation('/v2/api/generation-members', (url, data) => api.post(url, data.arg));

  const {
    trigger: deleteTrigger,
    isMutating: deleteIsMutating,
    error: deleteError,
  } = useSWRMutation('/v2/api/generation-members', (url, data) =>
    api.delete(url + '?generationMemberId=' + data.arg),
  );

  const {
    trigger: patchTrigger,
    isMutating: patchIsMutating,
    error: patchError,
  } = useSWRMutation('/v2/api/generation-members', (url, data) =>
    api.patch(url + '?generationMemberId=' + data.arg),
  );

  //
  //
  //

  _return.current.post = async (mutationParams: CotatoCreateGenerationMemberRequest) => {
    try {
      await postTrigger(mutationParams as any);
      params?.onSuccessPost?.();
    } catch (err) {
      params?.onErrorPost?.();
    }
  };
  _return.current.delete = async (mutationParams: { generationMemberId: number }) => {
    try {
      await deleteTrigger(mutationParams.generationMemberId as any);
      params?.onSuccessDelete?.();
    } catch (err) {
      params?.onErrorDelete?.();
    }
  };
  _return.current.patch = async (mutationParams: CotatoUpdateGenerationMemberRoleRequest) => {
    try {
      await patchTrigger(mutationParams.generationMemberId as any);
      params?.onSuccessPatch?.();
    } catch (err) {
      params?.onErrorPatch?.();
    }
  };
  _return.current.isMutating = isPostMutating || deleteIsMutating || patchIsMutating;
  _return.current.error = postError || deleteError || patchError;

  return _return.current;
};
