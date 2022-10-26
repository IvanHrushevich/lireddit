import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';

import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const register: FC = () => {
  return (
    <Wrapper variant="small">
      <Formik initialValues={{ username: '', password: '' }} onSubmit={console.log}>
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
