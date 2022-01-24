import { DashboardProvider } from '@/common/contexts/dashboard-context';
import { DashboardNavbar } from '@/common/templates/dashboard-template/dashboard-navbar';
import { DashboardSidebar } from '@/common/templates/dashboard-template/dashboard-sidebar';
import React from 'react';

import { Root, Main } from './styles';

type Props = {
  children: React.ReactNode;
};

const DashboardTemplate = ({ children }: Props) => (
  <DashboardProvider>
    <Root>
      <DashboardNavbar />
      <DashboardSidebar />
      <Main>{children}</Main>
    </Root>
  </DashboardProvider>
);

export { DashboardTemplate };
