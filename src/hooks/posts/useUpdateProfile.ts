import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { User } from '@/models/user';
import { updateProfile } from '@/services/posts/updateProfile';
import { getUserProfile } from '@/services/users/getUserProfile';
import { selectUser } from '@/store/redux/auth/auth.selector';
import { updateUser } from '@/store/redux/auth/auth.slice';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  return useMutation({
    mutationFn: updateProfile,
    // Using optimistic update to immediately update UI
    onMutate: async ({ payload }) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['user'] });

      // Save the current user data for potential rollback
      const previousUser = currentUser ? { ...currentUser } : null;

      // Create optimistic user update (without avatar URL since we can't generate that yet)
      const optimisticUpdate: Partial<User> = {};

      if (payload.name) {
        optimisticUpdate.name = payload.name;
      }

      if (payload.headline) {
        optimisticUpdate.headline = payload.headline;
      }

      // Only if we have updates to make
      if (Object.keys(optimisticUpdate).length > 0) {
        // Update Redux store (which also updates localStorage)
        dispatch(updateUser(optimisticUpdate));
      }

      // Return the previous user data so we can use it in onError for rollback
      return { previousUser };
    },
    // When mutation is successful, update with the actual server response
    onSuccess: (updatedUser) => {
      // Update Redux store with the actual response data from the server
      dispatch(updateUser(updatedUser));

      // If there was an avatar update, we now have the proper URL from the server
    },
    // If the mutation fails
    onError: (err, _variables, context) => {
      console.error('Error updating profile:', err);

      // Revert to the previous user state when error occurs
      if (context?.previousUser) {
        // Restore the previous user data in Redux and localStorage
        dispatch(updateUser(context.previousUser));
        console.log('Reverted profile changes due to server error');
      }
    },
    // Always refetch after error or success to ensure consistency
    onSettled: (_data, _error, _variables, context) => {
      // Get the email from previous user context
      const userEmail = context?.previousUser?.email;

      if (userEmail) {
        // Invalidate previous queries first
        queryClient.invalidateQueries({ queryKey: ['user'] });

        // Fetch the latest user data from server
        queryClient
          .fetchQuery({
            queryKey: ['/users', { email: userEmail }],
            queryFn: getUserProfile,
          })
          .then((freshUserData) => {
            if (freshUserData) {
              // Update Redux store with fresh data from server
              dispatch(updateUser(freshUserData));
            }
          });
      }
    },
  });
};
