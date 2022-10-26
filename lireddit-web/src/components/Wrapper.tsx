import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  variant?: 'small' | 'regular';
  children: React.ReactNode;
}

const Wrapper: FC<Props> = ({ children, variant = 'regular' }) => {
  return (
    <Box mt={8} mx="auto" w="100%" maxW={variant === 'regular' ? '800px' : '400px'}>
      {children}
    </Box>
  );
};

export default Wrapper;
