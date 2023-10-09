import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import AvatarStub from '../assets/avatar_stub.png';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useUpdateUserNameQuery } from '../hooks/useUpdateUserName';

const MyProfile = () => {
  const [name, setName] = useState('');
  const { authStore } = useContext(Context);
  const { mutate: updateUserName } = useUpdateUserNameQuery();
  const handleUpdateName = () => {
    updateUserName({ name, id: authStore.user.id });
  };
  useEffect(() => {
    setName(authStore.user.name);
  }, []);
  return (
    <Center py={6}>
      <Box
        maxW={'60%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://img.freepik.com/premium-vector/abstract-blurred-background-gradient-gentle-background_566661-16618.jpg'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={AvatarStub}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} marginBottom={5} fontWeight={500} fontFamily={'body'}>
              You can change your personal data
            </Heading>
            <Box width={'40%'}>
              <Text marginBottom={2} color={'gray.500'}>
                Change name
              </Text>
              <Input onChange={(e) => setName(e.currentTarget.value)} placeholder={'Name'} value={name} />
            </Box>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={handleUpdateName}
          >
            Update profile
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default observer(MyProfile);
