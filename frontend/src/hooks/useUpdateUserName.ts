import { useQuery } from 'react-query';
import UserService from '../services/UserService';
import { useToastError } from './useToastError';
import { QUERY_KEYS } from '../enum';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { UpdateUserDto } from '../dto/update-user.dto';
import { useToast } from '@chakra-ui/react';

export const useUpdateUserNameQuery = () => {
  const showError = useToastError();
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateUserDto) => UserService.updateUserName(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      toast({
        title: 'User name updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
    },
    onError: showError
  });
};