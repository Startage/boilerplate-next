import { nextPrivatePage } from '@/common/helpers/next-private-page';
import { DashboardTemplate } from '@/common/templates/dashboard-template';
import { ChangePasswordForm } from '@/modules/auth/components/change-password-form';
import { GeneralProfileForm } from '@/modules/auth/components/general-profile-form';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { MdAccountBox, MdLock } from 'react-icons/md';

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState('general');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardTemplate>
      <Container>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                icon={<MdAccountBox size={22} />}
                iconPosition="start"
                label="Geral"
                value="general"
              />
              <Tab
                icon={<MdLock size={22} />}
                iconPosition="start"
                label="Alterar senha"
                value="change-password"
              />
            </TabList>
          </Box>
          <TabPanel value="general">
            <GeneralProfileForm />
          </TabPanel>
          <TabPanel value="change-password">
            <ChangePasswordForm />
          </TabPanel>
        </TabContext>
      </Container>
    </DashboardTemplate>
  );
}

export const getServerSideProps: GetServerSideProps = nextPrivatePage(
  async () => {
    return {
      props: {},
    };
  },
);
