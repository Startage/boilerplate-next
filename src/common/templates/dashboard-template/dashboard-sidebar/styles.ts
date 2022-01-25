import { DRAWER_WIDTH } from '@/common/consts/dashboard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Menu as MuiMenu, Theme } from '@mui/material';
import { Scrollbar as DefaultScrollbar } from '@/common/components/';

export const Root = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    ${theme.breakpoints.up('lg')} {
      flex-shrink: 0;
      width: ${DRAWER_WIDTH}px;
    }
  `}
`;

export const Account = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing(2, 2.5)};
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.grey[200]};
  `}
`;

export const Menu = styled(MuiMenu)`
  ${css`
    div {
      width: 100%;
      max-width: 240px;
    }
  `}
`;

export const Scrollbar = styled(DefaultScrollbar)`
  ${css`
    height: 100%;
    & .simplebar-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `}
`;
