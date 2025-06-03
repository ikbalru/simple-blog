import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { loginUser } from '@/models/user';

type LoginParams = {
  payload: loginUser;
};

type LoginResponse = {
  token: string;
};

export const postLogin: MutationFunction<LoginResponse, LoginParams> = async ({
  payload,
}) => {
  const response = await api.post('/auth/login', payload);

  return response.data;
};
