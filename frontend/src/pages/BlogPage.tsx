import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import List from '../components/List';
import { usePostsQuery } from '../hooks/usePostsQuery';
import Post from '../components/Post';
import { IPost } from '../models/Post';

const BlogPage = () => {
  const { data, isLoading, isSuccess } = usePostsQuery();
  const posts = data?.data;
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <Box p={10} display="flex" justifyContent="center">
        <Heading as="h1">You can read posts from other users</Heading>
      </Box>
      {posts && posts?.length > 0 && (
        <List items={posts as IPost[]} renderItem={(post: IPost) => <Post key={post.id} post={post} />} />
      )}
    </>
  );
};

export default BlogPage;
