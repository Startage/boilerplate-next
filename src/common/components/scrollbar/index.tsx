import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Root, SimpleBar } from './styles';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
};
const Scrollbar = ({ children, className }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);

  if (isMobile) {
    return (
      <Box className={className} sx={{ overflowX: 'auto' }}>
        {children}
      </Box>
    );
  }

  return (
    <Root>
      <SimpleBar className={className} timeout={500} clickOnTrack={false}>
        {children}
      </SimpleBar>
    </Root>
  );
};

export { Scrollbar };
