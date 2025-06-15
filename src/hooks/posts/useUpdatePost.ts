import { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Post } from '@/models/post';
import {
  GetMyPostQueryKey,
  GetMyPostResponse,
} from '@/services/posts/getMyPost';
import { updatePost, UpdatePostPayload } from '@/services/posts/updatePost';
import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

type UpdatePostVariables = {
  payload: UpdatePostPayload;
  queryKey: GetMyPostQueryKey;
  id: number;
};

type MutationContext = {
  previousData: InfiniteData<GetMyPostResponse> | undefined;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(selectUser);

  const updatePostMutation = useMutation<
    Post,
    Error,
    UpdatePostVariables,
    MutationContext
  >({
    mutationFn: updatePost,
    onMutate: async ({ payload, queryKey, id }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<GetMyPostResponse>>(queryKey);

      const updatedPost = {
        id: Math.random(),
        title: payload.title,
        content: payload.content,
        tags: payload.tags,
        imageUrl: '',
        createdAt: new Date().toISOString(),
        author: {
          id: currentUser?.id,
          name: currentUser?.name,
          email: currentUser?.email,
        },
        likes: 0,
        comments: 0,
      };
      console.log(id);
      console.log('previos', previousData);

      if (previousData) {
        const filterData = {
          ...previousData,
          pages: previousData.pages.map((page) => ({
            ...page,
            data: page.data.filter((post) => post.id !== id),
          })),
        };

        const updatedData = {
          ...previousData,
          pages: filterData.pages.map((page) => ({
            ...page,
            data: [updatedPost, ...page.data],
          })),
        };

        queryClient.setQueryData(queryKey, updatedData);
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
    updatePost: updatePostMutation.mutateAsync,
    isUpdating: updatePostMutation.isPending,
    error: updatePostMutation.error,
  };
};
