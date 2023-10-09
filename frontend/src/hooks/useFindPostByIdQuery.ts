import { useQuery } from 'react-query';
import PostService from '../services/PostService';
import { useToastError } from './useToastError';
import { QUERY_KEYS } from '../enum';

export const useFindPostByIdQuery = (id: string) => {
  const showError = useToastError();
  return useQuery({
    queryFn: () => PostService.getPost(id),
    queryKey: [QUERY_KEYS.POSTS, id],
    onError: showError
  });
};
