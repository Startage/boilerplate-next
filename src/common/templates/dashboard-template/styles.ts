import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from '@/common/consts/dashboard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const Root = styled.div`
  display: flex;
  min-height: 100%;
  overflow: hidden;
`;

export const Main = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    flex-grow: 1;
    overflow: auto;
    min-height: 100%;
    padding-top: ${APP_BAR_MOBILE + 24}px;
    padding-bottom: ${theme.spacing(10)};
    ${theme.breakpoints.up('lg')} {
      padding-top: ${APP_BAR_DESKTOP + 24}px;
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(2)};
    }
  `}
`;
