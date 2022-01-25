import { getPublicApiInstance } from '@/common/axios-instance';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/common/consts/api';
import { AccessDeniedError, UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { GetServerSidePropsContext } from 'next/types';
import { destroyCookie } from 'nookies';

export const httpRefreshToken = async (
  {
    refreshTokenId,
  }: {
    refreshTokenId: string;
  },
  ctx?: GetServerSidePropsContext,
): Promise<{
  accessToken: string;
}> => {
  try {
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
  } catch (err) {
    const { status } = handleAxiosError(err);
    if (status === 403) {
      destroyCookie(ctx, ACCESS_TOKEN_NAME);
      destroyCookie(ctx, REFRESH_TOKEN_NAME);
      throw new AccessDeniedError();
    } else {
      throw new UnexpectedError();
    }
  }
};
