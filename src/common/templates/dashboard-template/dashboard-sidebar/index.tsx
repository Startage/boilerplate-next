import { DRAWER_WIDTH } from '@/common/consts/dashboard';
import { AuthContext } from '@/common/contexts/auth-context';
import { DashboardContext } from '@/common/contexts/dashboard-context';
import { DashboardSidebarNav } from '@/common/templates/dashboard-template/dashboard-sidebar/dashboard-sidebar-nav';
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useContext } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Root, Account, Scrollbar, Menu } from './styles';

const DashboardSidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isOpenSidebar, onCloseSidebar } = useContext(DashboardContext);
  const { onOpenLogout } = useContext(AuthContext);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={Link} href="/" sx={{ display: 'inline-flex' }}>
          LOGO
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Account onClick={handleClick}>
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
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
          {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
          <MenuItem onClick={onOpenLogout}>Logout</MenuItem>
        </Menu>
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

      <Hidden lgDown>
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
