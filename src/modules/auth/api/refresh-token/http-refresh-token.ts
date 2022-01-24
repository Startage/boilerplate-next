import { getPublicApiInstance } from '@/common/axios-instance';
import { REFRESH_TOKEN_NAME } from '@/common/consts/api';
import { GetServerSidePropsContext } from 'next/types';
import { parseCookies } from 'nookies';

export const httpRefreshToken = async (
  ctx?: GetServerSidePropsContext,
): Promise<{
  accessToken: string;
}> => {
  const { [REFRESH_TOKEN_NAME]: refreshTokenId } = parseCookies(ctx);
  const {
    accessToken,
  }: {
    accessToken: string;
  } = (
    await getPublicApiInstance().put(`/auth/refresh-token/${refreshTokenId}`)
  ).data;
  return {
    accessToken,
  };
};
