import {
  APP_BAR_DESKTOP,
  APP_BAR_MOBILE,
  DRAWER_WIDTH,
} from '@/common/consts/dashboard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { alpha, AppBar, Theme, Toolbar as MuiToolbar } from '@mui/material';

export const Root = styled(AppBar)`
  ${({ theme }: { theme: Theme }) => css`
    box-shadow: none;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background-color: ${alpha(theme.palette.background.default, 0.72)};
    ${theme.breakpoints.up('lg')} {
      width: calc(100% - ${DRAWER_WIDTH + 1}px);
    }
  `}
`;

export const Toolbar = styled(MuiToolbar)`
  ${({ theme }: { theme: Theme }) => css`
    min-height: ${APP_BAR_MOBILE};
    ${theme.breakpoints.up('lg')} {
      min-height: ${APP_BAR_DESKTOP}px;
      padding: ${theme.spacing(0, 5)};
    }
  `}
`;
