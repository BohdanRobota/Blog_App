import { useQuery } from 'react-query';
import PostService from '../services/PostService';
import { useToastError } from './useToastError';
import { QUERY_KEYS } from '../enum';

export const usePostsQuery = () => {
  const showError = useToastError();
  return useQuery({
    queryFn: () => PostService.fetchPosts(),
    queryKey: [QUERY_KEYS.POSTS],
    staleTime: 5000,
    onError: showError
  });
};
