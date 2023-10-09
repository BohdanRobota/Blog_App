import { Image, Text, HStack } from '@chakra-ui/react';
import AvatarStub from '../assets/avatar_stub.png';

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const PostAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack cursor="pointer" marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image borderRadius="full" boxSize="40px" src={AvatarStub} alt={`Avatar of ${props.name}`} />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export default PostAuthor;
