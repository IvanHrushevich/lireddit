import { Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <Flex bg="tomato" p={4} justifyContent="end">
      <NextLink href="/login">login</NextLink>
      <NextLink href="/register">register</NextLink>
    </Flex>
  );
};

export default Navbar;
