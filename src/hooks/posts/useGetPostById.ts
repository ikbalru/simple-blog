import { useQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import { GetPostById, GetPostByIdQueryKey } from '@/services/posts/getPostbyId';

type UseGetPostByIdParams = {
  id: number;
};

type UseGetPostByIdReturn = {
  post: Post | null;
  error: Error | null;
  isFetching: boolean;
  queryKeyPostById: GetPostByIdQueryKey;
};

export const useGetPostById = ({
  id,
}: UseGetPostByIdParams): UseGetPostByIdReturn => {
  const queryKeyPostById: GetPostByIdQueryKey = ['posts', { id }];

  const { data, error, isFetching } = useQuery({
    queryKey: queryKeyPostById,
    queryFn: GetPostById,
  });

  const post = data ?? null;

  return {
    post,
    error,
    isFetching,
    queryKeyPostById,
  };
};
