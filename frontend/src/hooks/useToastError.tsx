import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

export const useToastError = () => {
  const toast = useToast();
  return (err: Error) => {
    if (err instanceof AxiosError) {
      toast({
        status: 'error',
        title: err.response?.data.message,
        position: 'top',
      });
      return;
    }
    if (err instanceof Error) {
      toast({
        status: 'error',
        title: err.message,
        position: 'top',
      });
    }
  };
};
