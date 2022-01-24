import { getAuthorizedApiInstance } from '@/common/axios-instance';
import { ACCESS_TOKEN_NAME } from '@/common/consts/api';
import { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import { parseCookies } from 'nookies';

export const nextPrivatePage = async ({
  ctx,
  onSuccess,
}: {
  ctx: GetServerSidePropsContext;
  onSuccess: (axios: AxiosInstance) => { props: any } | Promise<{ props: any }>;
}) => {
  const { [ACCESS_TOKEN_NAME]: accessToken } = parseCookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const axios = getAuthorizedApiInstance(ctx);

  return onSuccess(axios);
};
