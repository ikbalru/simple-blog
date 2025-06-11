import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { registerUser } from '@/models/user';

type RegisterParams = {
  payload: registerUser;
};

type RegisterResponse = {
  id: number;
  email: string;
};

export const postRegister: MutationFunction<
  RegisterResponse,
  RegisterParams
> = async ({ payload }) => {
  const response = await api.post('/auth/register', payload);

  return response.data;
};
