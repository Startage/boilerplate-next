import { ACCESS_TOKEN_NAME, API_URL } from '@/common/consts/api';
import { httpRefreshToken } from '@/modules/auth/api/refresh-token/http-refresh-token';
import axios, { AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { GetServerSidePropsContext } from 'next/types';
import { parseCookies } from 'nookies';

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

const getAuthorizedApiInstance = (ctx?: GetServerSidePropsContext) => {
  const { [ACCESS_TOKEN_NAME]: accessToken } = parseCookies(ctx);

  if (accessToken) {
    createAuthRefreshInterceptor(
      axiosInstanceAuthorized,
      async (failedRequest) => {
        const { accessToken } = await httpRefreshToken(ctx);
        failedRequest.response.config.headers[
          'Authorization'
        ] = `Baerer ${accessToken}`;
        axiosInstanceAuthorized.defaults.headers.common[
          'Authorization'
        ] = `Baerer ${accessToken}`;
      },
    );
    axiosInstanceAuthorized.defaults.headers.common[
      'Authorization'
    ] = `Baerer ${accessToken}`;
  }

  return axiosInstanceAuthorized;
};

export { getPublicApiInstance, getAuthorizedApiInstance };
