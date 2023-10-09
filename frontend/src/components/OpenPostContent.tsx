import React, { FC } from 'react';
import PostAuthor from '../components/PostAuthor';
import { API_URL } from '../const';
import { Box, Container, Heading } from '@chakra-ui/react';

interface PostItemProps {
  post: {
    title: string;
    createdAt: string;
    authorName: string;
    content: string;
    image: string;
  };
}
const OpenPostContent: FC<PostItemProps> = ({ post }: PostItemProps) => {
  return (
    <Box className="post-page" margin={'0 auto'} width={'80%'}>
      <Box display={'flex'} marginTop={10}>
        <Heading marginBottom={5}>{post.title}</Heading>
      </Box>
      <PostAuthor name={post.authorName} date={new Date(post.createdAt)} />
      <Box marginBottom={10} marginTop={10} className="image">
        <img src={API_URL + '/' + post.image} alt="" />
      </Box>
      <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </Box>
  );
};

export default OpenPostContent;
