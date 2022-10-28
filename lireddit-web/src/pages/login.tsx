import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';

import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';

const Login: FC = () => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          const errors = response.data?.login.errors;
          const user = response.data?.login.user;

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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
