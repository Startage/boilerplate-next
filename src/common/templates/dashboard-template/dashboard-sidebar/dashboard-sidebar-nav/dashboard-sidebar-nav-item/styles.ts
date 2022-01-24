import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import {
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ListItemProps,
  Theme,
} from '@mui/material';

export const ListItem: StyledComponent<
  ListItemProps & {
    component?: any;
    href?: string;
  }
> = styled(MuiListItem)`
  ${({ theme }: { theme: Theme }) => css`
    height: 48px;
    position: relative;
    text-transform: capitalize;
    padding-left: ${theme.spacing(5)};
    padding-right: ${theme.spacing(2.5)};
    color: ${theme.palette.text.secondary};
    cursor: pointer;
    &:before {
      top: 0;
      right: 0;
      width: 3px;
      bottom: 0;
      content: '';
      display: none;
      position: absolute;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      background-color: ${theme.palette.primary.main};
    }
  `}
`;

export const ListItemIcon = styled(MuiListItemIcon)`
  ${css`
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
