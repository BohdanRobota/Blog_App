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
  useToast,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RouterNames } from '../router';
import { IRegisterData } from '../types/registerData.interface';
import { initialValuesRegister } from '../validations/initialValues/initialValueRegister';
import { registerSchema } from '../validations/schemas/register.schema';
import { useToastError } from '../hooks/useToastError';
import { AxiosError } from 'axios';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const toastError = useToastError();
  const { authStore } = useContext(Context);
  const toast = useToast();
  const onSubmit = async (data: IRegisterData, actions: FormikHelpers<IRegisterData>) => {
    try {
      const response = await authStore.register(data.email, data.pass);
      actions.resetForm();
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      navigate(RouterNames.MY_PROFILE);
    } catch (err) {
      if (err instanceof AxiosError) {
        toastError(err as AxiosError);
      } else {
        toastError(err as Error);
      }
    }
  };
  const { handleBlur, handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: registerSchema,
    onSubmit,
  });
  return (
    <Box>
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8">
            <Heading as="h1" fontWeight="300" fontSize="24px" letterSpacing="-0.5px">
              Create Account to BlogApp
            </Heading>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm">Username or email address</FormLabel>
                    <Input
                      type="text"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className={errors.email && touched.email ? 'input-error' : ''}
                    />
                    {errors.email && touched.email && <div className="form-error">{errors.email}</div>}
                  </FormControl>
                  <FormControl>
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
                    <Input
                      id="confirm"
                      name="confirm"
                      value={values.confirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      marginTop="20px"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      placeholder="Repeat password"
                      className={errors.confirm && touched.confirm ? 'input-error' : ''}
                    />
                    {errors.confirm && touched.confirm && <div className="form-error">{errors.confirm}</div>}
                  </FormControl>

                  <Button
                    type="submit"
                    bg="#2da44e"
                    color="white"
                    size="sm"
                    _hover={{ bg: '#2c974b' }}
                    _active={{ bg: '#298e46' }}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card variant="outline" borderColor="#d0d7de">
            <CardBody>
              <Center>
                <HStack fontSize="sm" spacing="1">
                  <Text>Already have an account?</Text>
                  <Link onClick={() => navigate(RouterNames.LOGIN)} isExternal color="#0969da">
                    Login to the app.
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
