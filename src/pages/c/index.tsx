import { nextPrivatePage } from '@/common/helpers/next-private-page';
import { ProfileModel } from '@/common/models/profile-model';
import { DashboardTemplate } from '@/common/templates/dashboard-template';
import { httpLoadProfile } from '@/modules/auth/api/load-profile/http-load-profile';
import { Button, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useMutation } from 'react-query';

export default function Dashboard() {
  const { mutate } = useMutation(httpLoadProfile, {
    onSuccess: (profile: ProfileModel) => {
      console.log(profile);
    },
  });
  return (
    <DashboardTemplate>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Dasshboard
      </Typography>
      <Button
        onClick={() => {
          mutate();
        }}
      >
        PROFILE
      </Button>
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
