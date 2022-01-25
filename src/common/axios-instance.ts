import {
  ACCESS_TOKEN_NAME,
  API_URL,
  DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
  REFRESH_TOKEN_NAME,
} from '@/common/consts/api';
import { AuthContext } from '@/common/contexts/auth-context';
import { AccessDeniedError } from '@/common/errors';
import { httpRefreshToken } from '@/modules/auth/api/refresh-token/http-refresh-token';
import axios, { AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { GetServerSidePropsContext } from 'next/types';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useContext } from 'react';

export const makeApiUrl = (path = ''): string => {
  return `${API_URL}${path}`;
};

const axiosInstance = axios.create({
  baseURL: `${makeApiUrl('/api')}`,
});

const axiosInstanceAuthorized = axios.create({
  baseURL: `${makeApiUrl('/api')}`,
});

const interceptors = [
  (response: AxiosResponse) => response,
  (e: any): Promise<AxiosResponse> => {
    return Promise.reject(e);
  },
];

axiosInstance.interceptors.response.use(...interceptors);
axiosInstanceAuthorized.interceptors.response.use(...interceptors);

const getPublicApiInstance = () => axiosInstance;

createAuthRefreshInterceptor(
  axiosInstanceAuthorized,
  async (failedRequest) => {
    const { [REFRESH_TOKEN_NAME]: refreshTokenId } = parseCookies();
    if (!refreshTokenId) {
      destroyCookie(undefined, ACCESS_TOKEN_NAME, {
        path: '/',
      });
      throw new AccessDeniedError();
    }
    const { accessToken } = await httpRefreshToken({
      refreshTokenId: refreshTokenId,
    });
    setCookie(undefined, ACCESS_TOKEN_NAME, accessToken, {
      maxAge: DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
    });
    failedRequest.response.config.headers[
      'Authorization'
    ] = `Bearer ${accessToken}`;
    axiosInstanceAuthorized.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  },
  {
    pauseInstanceWhileRefreshing: true, // padrão: false
  },
);

const getAuthorizedApiInstance = (ctx?: GetServerSidePropsContext) => {
  const { [ACCESS_TOKEN_NAME]: accessToken } = parseCookies(ctx);

  if (accessToken) {
    axiosInstanceAuthorized.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  }

  return axiosInstanceAuthorized;
};

export { getPublicApiInstance, getAuthorizedApiInstance };
