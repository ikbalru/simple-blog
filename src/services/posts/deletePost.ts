import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';

type DeletePostParams = {
  id: number;
};

export type DeletePostResponse = {
  success: boolean;
};

export const deletePost: MutationFunction<
  DeletePostResponse,
  DeletePostParams
> = async ({ id }) => {
  console.log('idDelete:', id);
  const response = await api.delete(`/posts/${id}`);

  return response.data;
};
