import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { CreateComment, Comment } from '@/models/comment';
import { currentUser } from '@/models/user';
import { createPostComment } from '@/services/comments/createPostComment';
import { CommentsQueryKey } from '@/services/posts/getPostComment';

export type CreateCommentVariables = {
  postId: number;
  payload: CreateComment;
  queryKey: CommentsQueryKey;
  currentUser: currentUser;
};

type UseCreateCommentReturn = {
  createComment: UseMutateAsyncFunction<
    void | Comment,
    Error,
    CreateCommentVariables
  >;
  isCreating: boolean;
  error: Error | null;
};

type MutationContext = {
  previousData: Comment[] | undefined;
};

export const useCreateComment = (): UseCreateCommentReturn => {
  const queryClient = useQueryClient();

  const CreateCommentMutation = useMutation<
    void | Comment,
    Error,
    CreateCommentVariables,
    MutationContext
  >({
    mutationFn: createPostComment,

    onMutate: async ({ payload, queryKey, currentUser }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<Comment[]>(queryKey);

      const newComment = {
        id: Math.random(),
        content: payload.content,
        createdAt: new Date().toISOString(),
        author: {
          id: currentUser.id,
          name: currentUser.name,
          headline: currentUser.headline,
          avatarUrl: currentUser.avatarUrl,
        },
      };

      if (previousData) {
        const updatedData = [...previousData, newComment];

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
    createComment: CreateCommentMutation.mutateAsync,
    isCreating: CreateCommentMutation.isPending,
    error: CreateCommentMutation.error,
  };
};
