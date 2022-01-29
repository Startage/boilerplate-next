import { DRAWER_WIDTH } from '@/common/consts/dashboard';
import { PAGE_CUSTOMER_PROFILE } from '@/common/consts/pages';
import { AuthContext } from '@/common/contexts/auth-context';
import { DashboardContext } from '@/common/contexts/dashboard-context';
import { DashboardSidebarNav } from '@/common/templates/dashboard-template/dashboard-sidebar/dashboard-sidebar-nav';
import { httpLoadProfile } from '@/modules/auth/api/load-profile/http-load-profile';
import { LOAD_PROFILE_QUERY } from '@/modules/auth/consts/queries';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useQuery } from 'react-query';

import { Root, Account, Scrollbar, Menu } from './styles';

const DashboardSidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isOpenSidebar, onCloseSidebar } = useContext(DashboardContext);
  const { onOpenLogout } = useContext(AuthContext);
  const router = useRouter();
  const { data: profile } = useQuery(LOAD_PROFILE_QUERY, httpLoadProfile);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateTo = (page: string) => {
    router.push(page);
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
          <Avatar src={profile?.avatarUrl} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {profile?.name}
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
          <MenuItem onClick={() => handleNavigateTo(PAGE_CUSTOMER_PROFILE)}>
            Minha Conta
          </MenuItem>
          <Divider light />
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
