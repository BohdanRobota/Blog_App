import React, { FC, useContext } from 'react';
import { Context } from '..';
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RouterNames } from '../router';
import { ILoginData } from '../types/loginData.interface';
import { initialValuesLogin } from '../validations/initialValues/initialValueLogin';
import { loginSchema } from '../validations/schemas/login.schema';
import { useToastError } from '../hooks/useToastError';
import { AxiosError } from 'axios';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const toastError = useToastError();
  const { authStore } = useContext(Context);
  const onSubmit = async (data: ILoginData, actions: FormikHelpers<ILoginData>) => {
    try {
      await authStore.login(data.email, data.pass);
      actions.resetForm();
      navigate(RouterNames.BLOG);
    } catch (err) {
      if (err instanceof AxiosError) {
        toastError(err as AxiosError);
      } else {
        toastError(err as Error);
      }
    }
  };
  const { handleBlur, handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <Box>
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8">
            <Heading as="h1" fontWeight="300" fontSize="24px" letterSpacing="-0.5px">
              Sign in to Blog App
            </Heading>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm">Username or email address</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className={errors.email && touched.email ? 'input-error' : ''}
                      type="text"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                    {errors.email && touched.email && <div className="form-error">{errors.email}</div>}
                  </FormControl>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Password</FormLabel>
                    </HStack>
                    <Input
                      id="pass"
                      name="pass"
                      value={values.pass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      placeholder="Password"
                      className={errors.pass && touched.pass ? 'input-error' : ''}
                    />
                    {errors.pass && touched.pass && <div className="form-error">{errors.pass}</div>}
                  </FormControl>

                  <Button
                    type="submit"
                    bg="#2da44e"
                    color="white"
                    size="sm"
                    _hover={{ bg: '#2c974b' }}
                    _active={{ bg: '#298e46' }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card variant="outline" borderColor="#d0d7de">
            <CardBody>
              <Center>
                <HStack fontSize="sm" spacing="1">
                  <Text>New to Blog App?</Text>
                  <Link onClick={() => navigate(RouterNames.REGISTER)} isExternal color="#0969da">
                    Create an account.
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
};

export default LoginForm;
