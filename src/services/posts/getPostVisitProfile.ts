import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { PostComplete } from '@/models/post';
import { User } from '@/models/user';

export type VisitProfileQueryKey = [
  string,
  string,
  {
    userId: number;
  },
  {
    limit?: number;
  },
];

export type PostVisitProfileResponse = {
  data: PostComplete[];
  total: number;
  page: number;
  lastPage: number;
  user: User;
};

export const GetPostVisitProfile: QueryFunction<
  PostVisitProfileResponse,
  VisitProfileQueryKey,
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [path, subPath, { userId }, { limit }] = queryKey;

  const apiPath = `/${path}/${subPath}/${userId}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { limit, page: pageParam },
  };

  const response = await api.get(apiPath, axiosRequestConfig);

  return response.data;
};
