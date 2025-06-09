import { QueryFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { User } from '@/models/user';

export type GetUserProfileQueryKey = [string, { email: string }];

export const getUserProfile: QueryFunction<
  User,
  GetUserProfileQueryKey
> = async ({ queryKey }) => {
  const [path, { email }] = queryKey;

  const apiPath = `${path}/${email}`;

  const response = await api.get(apiPath);

  return response.data;
};
