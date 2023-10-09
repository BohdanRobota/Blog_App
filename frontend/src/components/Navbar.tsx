import {
  Box,
  Flex,
  Avatar,
  HStack,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { Context } from '..';
import { Link } from 'react-router-dom';
import { RouterNames } from '../router';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AvatarStub from '../assets/avatar_stub.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { authStore } = useContext(Context);
  console.log(authStore.isAuth);
  return (
    <>
      <Box bg={'gray.200'} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box boxSize="50px" cursor="pointer">
              <Link to={RouterNames.BLOG}>
                <Box display={'flex'}>
                  <Image src="https://cdn-icons-png.flaticon.com/512/60/60736.png" />
                  <Heading marginLeft={2} typeof="h2">
                    Log
                  </Heading>
                </Box>
              </Link>
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            {!authStore.isAuth && !authStore.isLoading && (
              <Button
                onClick={() => navigate(RouterNames.LOGIN)}
                variant={'outline'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
              >
                Sign In
              </Button>
            )}
            {!authStore.isAuth && !authStore.isLoading && (
              <Button
                onClick={() => navigate(RouterNames.REGISTER)}
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
              >
                Sign Up
              </Button>
            )}
            {authStore.isAuth && (
              <Button
                onClick={() => navigate(RouterNames.CREATE_POST)}
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Add New Post
              </Button>
            )}
            {authStore.isAuth && (
              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                  <Avatar size={'md'} src={AvatarStub} />
                </MenuButton>
                <MenuList>
                  <Link to={RouterNames.MY_PROFILE}>
                    <MenuItem>My profile</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      authStore.logout();
                      navigate(RouterNames.LOGIN);
                    }}
                  >
                    <ExternalLinkIcon marginRight="2" />
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default observer(Navbar);
