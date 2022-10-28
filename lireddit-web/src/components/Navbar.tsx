import { Box, Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { useMeQuery } from '../generated/graphql';

interface Props {}

const Navbar: FC<Props> = () => {
  const [{ data, fetching }] = useMeQuery();

  const isUserLoggedIn: boolean = !!data?.me;

  let links = null;

  if (!fetching && isUserLoggedIn) {
    links = (
      <Flex>
        <Box mr={2}>{data!.me!.username}</Box>
        <Button variant="link">log out</Button>
      </Flex>
    );
  } else if (!fetching && !isUserLoggedIn) {
    links = (
      <>
        <NextLink href="/login" style={{ marginRight: '10px' }}>
          login
        </NextLink>
        <NextLink href="/register">register</NextLink>
      </>
    );
  }

  return (
    <Flex bg="tomato" p={4} justifyContent="end">
      {links}
    </Flex>
  );
};

export default Navbar;
