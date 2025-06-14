import { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreatePost } from '@/models/post';
import { createPost } from '@/services/posts/createPost';
import { CreatePostPayload } from '@/services/posts/createPost';
import {
  GetMyPostQueryKey,
  GetMyPostResponse,
} from '@/services/posts/getMyPost';
import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

type CretaePostVariables = {
  payload: CreatePostPayload;
  queryKey: GetMyPostQueryKey;
};

type MutationContext = {
  previousData: InfiniteData<GetMyPostResponse> | undefined;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(selectUser);

  const createPostMutation = useMutation<
    CreatePost,
    Error,
    CretaePostVariables,
    MutationContext
  >({
    mutationFn: createPost,
    onMutate: async ({ payload, queryKey }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<GetMyPostResponse>>(queryKey);

      const newPost = {
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

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          pages: previousData.pages.map((page) => ({
            ...page,
            data: [newPost, ...page.data],
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
    createPost: createPostMutation.mutateAsync,
    isCreating: createPostMutation.isPending,
    error: createPostMutation.error,
  };
};
