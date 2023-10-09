import React, { FC } from 'react';
import OpenPostContent from '../components/OpenPostContent';
import { useFindPostByIdQuery } from '../hooks/useFindPostByIdQuery';
import { useParams } from 'react-router-dom';
import { useFindUserByIdQuery } from '../hooks/useFindUserById.Query';
import { useToast } from '@chakra-ui/react';

const PostItem = () => {
  const params = useParams();
  const toast = useToast();
  const {
    data: postData,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    isError: postIsError,
  } = useFindPostByIdQuery(params.id as string);

  const {
    data: userData,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
  } = useFindUserByIdQuery(postData?.data.userId as string);

  if (postIsError || userIsError) {
    toast({
      status: 'error',
      title: 'Error',
      position: 'top',
    });
  }

  const postInfo = {
    authorName: userData?.data.name as string,
    title: postData?.data.title as string,
    createdAt: postData?.data.createdAt as string,
    content: postData?.data.content as string,
    image: postData?.data.image as string,
  };

  console.log(postInfo);
  return <>{postIsSuccess && userIsSuccess && <OpenPostContent post={postInfo} />}</>;
};

export default PostItem;
