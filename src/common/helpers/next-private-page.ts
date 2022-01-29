import { getAuthorizedApiInstance } from '@/common/axios-instance';
import {
  ACCESS_TOKEN_NAME,
  DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
  REFRESH_TOKEN_NAME,
} from '@/common/consts/api';
import { httpRefreshToken } from '@/modules/auth/api/refresh-token/http-refresh-token';
import { AxiosInstance } from 'axios';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import nookies, { parseCookies } from 'nookies';

export const nextPrivatePage =
  <P = Record<string, any>>(
    onSuccess: (
      ctx: GetServerSidePropsContext,
      config: {
        axios: AxiosInstance;
      },
    ) => Promise<GetServerSidePropsResult<P>>,
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const {
      [REFRESH_TOKEN_NAME]: refreshToken,
      [ACCESS_TOKEN_NAME]: accessToken,
    } = parseCookies(ctx);

    if (!refreshToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const axios = getAuthorizedApiInstance(ctx);
    if (!accessToken) {
      try {
        const { accessToken: refreshedAccessToken } = await httpRefreshToken(
          { refreshTokenId: refreshToken },
          ctx,
        );
        nookies.set(ctx, ACCESS_TOKEN_NAME, refreshedAccessToken, {
          maxAge: DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
        });
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${refreshedAccessToken}`;
      } catch (err) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    return onSuccess(ctx, {
      axios,
    });
  };
