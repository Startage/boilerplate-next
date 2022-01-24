/* eslint @typescript-eslint/no-empty-interface: 0 */
import '@emotion/react';
import '@emotion/styled';
import { Theme as MuiTheme } from '@mui/material';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
