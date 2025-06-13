import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deletePost, DeletePostResponse } from '@/services/posts/deletePost';
import {
  GetMyPostQueryKey,
  GetMyPostResponse,
} from '@/services/posts/getMyPost';

type DeletePostVariables = {
  id: number;
  queryKey: GetMyPostQueryKey;
};

type MutationContext = {
  previousData: InfiniteData<GetMyPostResponse> | undefined;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation<
    void | DeletePostResponse,
    Error,
    DeletePostVariables,
    MutationContext
  >({
    mutationFn: deletePost,

    onMutate: async ({ id, queryKey }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<GetMyPostResponse>>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          pages: previousData.pages.map((page) => ({
            ...page,
            data: page.data.filter((post) => post.id !== id),
          })),
        });
      }

      return { previousData };
    },

    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(variables.queryKey, context.previousData);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: variables.queryKey });
    },
  });

  return {
    deletePost: deletePostMutation.mutateAsync,
    isDeleting: deletePostMutation.isPending,
    error: deletePostMutation.error,
  };
};
