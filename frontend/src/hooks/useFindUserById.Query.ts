import { useQuery } from 'react-query';
import UserService from '../services/UserService';
import { useToastError } from './useToastError';
import { QUERY_KEYS } from '../enum';

export const useFindUserByIdQuery = (id: string) => {
  const showError = useToastError();
  return useQuery({
    queryFn: () => UserService.getUser(id),
    queryKey: [QUERY_KEYS.USER, id],
    onError: showError
  });
};
