import React from 'react';

import { Root, Content } from './styles';
import { Container, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

const AuthTemplate = ({ title, subTitle, children }: Props) => (
  <Root>
    <Container maxWidth="sm">
      <Content>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{subTitle}</Typography>
        </Stack>

        {children}
      </Content>
    </Container>
  </Root>
);

export { AuthTemplate };
