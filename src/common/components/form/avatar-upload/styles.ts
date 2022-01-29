import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import { CreateStyledComponent } from '@emotion/styled/base';
import {
  Avatar as MuiAvatar,
  IconButton as MuiIconButton,
  Typography,
} from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';

export const CenteredContent = styled.div`
  ${css`
    display: flex;
    justify-content: center;
  `}
`;

export const Avatar = styled(MuiAvatar)`
  ${({ theme }) => css`
    width: 140px;
    height: 140px;
    margin: 0 auto ${theme.spacing(2)}px;
    cursor: pointer;
  `}
`;

export const IconButton: StyledComponent<
  IconButtonProps & { component: string }
> = styled(MuiIconButton)`
  position: relative;
  padding: 0;

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.1s ease;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }

  :hover .overlay {
    opacity: 1;
  }
`;

export const EditTitle = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  max-width: 60px;
`;
