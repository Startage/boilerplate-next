import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    max-width: 480px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`;
