import { PAGE_CUSTOMER_DASHBOARD } from '@/common/consts/pages';
import { DashboardSidebarNavItem } from '@/common/templates/dashboard-template/dashboard-sidebar/dashboard-sidebar-nav/dashboard-sidebar-nav-item';
import { Box, List } from '@mui/material';
import { FaDashcube } from 'react-icons/fa';

const DashboardSidebarNav = () => {
  return (
    <Box>
      <List disablePadding>
        <DashboardSidebarNavItem
          title={'Dashboard'}
          icon={<FaDashcube />}
          path={PAGE_CUSTOMER_DASHBOARD}
        />
        {/*<DashboardSidebarNavItem*/}
        {/*  title={'Teste'}*/}
        {/*  icon={<FaAccessibleIcon />}*/}
        {/*  subNavItems={[*/}
        {/*    {*/}
        {/*      title: 'Teste 2',*/}
        {/*      icon: <FaAccessibleIcon />,*/}
        {/*      path: '/c/a',*/}
        {/*    },*/}
        {/*    {*/}
        {/*      title: 'Teste 3',*/}
        {/*      icon: <FaAccessibleIcon />,*/}
        {/*      path: '/c/b',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}
      </List>
    </Box>
  );
};

export { DashboardSidebarNav };
