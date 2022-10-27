import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useRouter } from 'next/router';

import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';

const register: FC = () => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          const errors = response.data?.register.errors;
          const user = response.data?.register.user;

          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="User Name" placeholder="User Name" />
            <Box mt={4}>
              <InputField name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
