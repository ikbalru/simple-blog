import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { userUpdatePassword } from '@/models/user';
import {
  updatePassword,
  UpdatePasswordResponse,
} from '@/services/users/updatePassword';

export type updatePasswordVariables = {
  payload: userUpdatePassword;
};

type UseUpdatePasswordReturn = {
  updatePassword: UseMutateAsyncFunction<
    UpdatePasswordResponse | void,
    Error,
    updatePasswordVariables
  >;
  isUpdating: boolean;
  error: Error | null;
};

export const UseUpdatePassword = (): UseUpdatePasswordReturn => {
  const queryClient = useQueryClient();

  const updatePasswordMutation = useMutation<
    void | UpdatePasswordResponse,
    Error,
    updatePasswordVariables
  >({
    mutationFn: updatePassword,

    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    updatePassword: updatePasswordMutation.mutateAsync,
    isUpdating: updatePasswordMutation.isPending,
    error: updatePasswordMutation.error,
  };
};
