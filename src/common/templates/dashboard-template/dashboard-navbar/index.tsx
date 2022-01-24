import { AuthContext } from '@/common/contexts/auth-context';
import { DashboardContext } from '@/common/contexts/dashboard-context';
import { Box, Hidden, IconButton, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { CgMenuRightAlt } from 'react-icons/cg';

import { Root, Toolbar } from './styles';

const DashboardNavbar = () => {
  const { onOpenSidebar } = useContext(DashboardContext);
  const { onOpenLogout } = useContext(AuthContext);
  return (
    <Root>
      <Toolbar>
        <Hidden lgUp mdDown={false}>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <CgMenuRightAlt />
          </IconButton>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <IconButton onClick={onOpenLogout}>
            <FaSignOutAlt />
          </IconButton>
        </Stack>
      </Toolbar>
    </Root>
  );
};

export { DashboardNavbar };
