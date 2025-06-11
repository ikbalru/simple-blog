'use client';

import { useQuery } from '@tanstack/react-query';

import { User } from '@/models/user';
import { GetUserProfileQueryKey } from '@/services/users/getUserProfile';
import { getUserProfile } from '@/services/users/getUserProfile';

type UseGetUserProfileParams = {
  email: string;
};

type UseGetUserProfileReturn = {
  user: User | null;
  isFetching: boolean;
  error: Error | null;
  queryKeyUserProfile: GetUserProfileQueryKey;
};

export const useGetUserProfile = ({
  email,
}: UseGetUserProfileParams): UseGetUserProfileReturn => {
  const queryKeyUserProfile: GetUserProfileQueryKey = ['/users', { email }];

  const { data, error, isFetching } = useQuery({
    queryKey: queryKeyUserProfile,
    queryFn: getUserProfile,
    enabled: !!email, // Only fetch when email is defined
  });

  const user = data ?? null;

  return {
    user,
    isFetching,
    error,
    queryKeyUserProfile,
  };
};
