import { DRAWER_WIDTH } from '@/common/consts/dashboard';
import { DashboardContext } from '@/common/contexts/dashboard-context';
import { DashboardSidebarNav } from '@/common/templates/dashboard-template/dashboard-sidebar/dashboard-sidebar-nav';
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useContext } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Root, Account, Scrollbar } from './styles';

const DashboardSidebar = () => {
  const { isOpenSidebar, onCloseSidebar } = useContext(DashboardContext);
  const renderContent = (
    <Scrollbar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={Link} href="/" sx={{ display: 'inline-flex' }}>
          LOGO
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Account>
          <Avatar />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Junior Miranda
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              dev
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <IconButton>
              <MdKeyboardArrowDown />
            </IconButton>
          </Box>
        </Account>
      </Box>

      <DashboardSidebarNav />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Root>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundColor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </Root>
  );
};

export { DashboardSidebar };
