import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useMutation } from 'urql';

import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const REGISTER_MUT: string = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        username
        id
      }
    }
  }
`;

const register: FC = () => {
  const [{}, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          const response = await register(values);
          console.log('response', response);
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
