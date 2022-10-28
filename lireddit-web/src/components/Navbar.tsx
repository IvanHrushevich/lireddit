import { Box, Flex, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import NextLink from 'next/link';

interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <Flex bg="tomato" p={4} justifyContent="end">
      <NextLink href="/login">
        <Link mr={2}>login</Link>
      </NextLink>
      <NextLink href="/register">
        <Link>register</Link>
      </NextLink>
    </Flex>
  );
};

export default Navbar;
