import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { userUpdatePassword } from '@/models/user';

type UpdatePasswordParams = {
  payload: userUpdatePassword;
};

export type UpdatePasswordResponse = {
  success: boolean;
};

export const updatePassword: MutationFunction<
  UpdatePasswordResponse,
  UpdatePasswordParams
> = async ({ payload: { currentPassword, newPassword, confirmPassword } }) => {
  const response = await api.patch('/users/password', {
    currentPassword,
    newPassword,
    confirmPassword,
  });

  return response.data;
};
