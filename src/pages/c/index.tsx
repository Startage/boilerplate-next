import { nextPrivatePage } from '@/common/helpers/next-private-page';
import { DashboardTemplate } from '@/common/templates/dashboard-template';
import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

export default function Dashboard() {
  return (
    <DashboardTemplate>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Dasshboard
      </Typography>
    </DashboardTemplate>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return nextPrivatePage({
    ctx,
    onSuccess: async () => {
      return {
        props: {},
      };
    },
  });
};
