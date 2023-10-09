import { Box, Heading, Image, Text, useColorModeValue, Container } from '@chakra-ui/react';
import PostAuthor from './PostAuthor';
import { FC } from 'react';
import { API_URL } from '../const';
import { useNavigate } from 'react-router-dom';
import { RouterNames } from '../router';
import { useFindUserByIdQuery } from '../hooks/useFindUserById.Query';

interface PostProps {
  post: {
    id: string;
    title: string;
    summary: string;
    image: string;
    createdAt: string;
    userId: string;
  };
}
const Post: FC<PostProps> = ({ post }) => {
  const { data: user } = useFindUserByIdQuery(post.userId);
  const navigate = useNavigate();
  return (
    <Container maxW={'6xl'} padding="2" onClick={() => navigate(RouterNames.OPEN_POST + post.id)}>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        {post.image && (
          <Box display="flex" cursor="pointer" flex="1" marginRight="3" position="relative" alignItems="center">
            <Box width={{ base: '100%', sm: '85%' }} zIndex="2" marginLeft={{ base: '0', sm: '5%' }} marginTop="5%">
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="lg"
                  src={API_URL + '/' + post.image}
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={'radial(orange.600 1px, transparent 1px)'}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
        )}
        <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: '3', sm: '0' }}>
          <Heading marginTop="1">
            <Text cursor="pointer" textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {post.title}
            </Text>
          </Heading>
          <Text as="p" cursor="pointer" marginTop="2" color={useColorModeValue('gray.700', 'gray.200')} fontSize="lg">
            {post.summary}
          </Text>
          <PostAuthor name={user?.data.name as string} date={new Date(post.createdAt)} />
        </Box>
      </Box>
    </Container>
  );
};

export default Post;
