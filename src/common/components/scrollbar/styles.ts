import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { alpha, Theme } from '@mui/material';
import SimpleBarReact from 'simplebar-react';

export const Root = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;

export const SimpleBar = styled(SimpleBarReact)`
  ${({ theme }: { theme: Theme }) => css`
    max-height: 100%;

    & .simplebar-scrollbar {
      &:before {
        background-color: ${alpha(theme.palette.grey[600], 0.48)};
      }
      &.simplebar-visible:before {
        opacity: 1;
      }
    }

    & .simplebar-track.simplebar-vertical {
      width: 10px;
    }

    & .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
      height: 6px;
    }

    & .simplebar-mask {
      z-index: inherit;
    }
  `}
`;
