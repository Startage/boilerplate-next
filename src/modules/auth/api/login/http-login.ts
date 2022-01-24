import { getPublicApiInstance } from '@/common/axios-instance';
import {
  InvalidCredentialsError,
  PendingEmailConfirmationError,
  UnexpectedError,
} from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { LoginData } from '@/modules/auth/types/login-data';

export const httpLogin = async ({
  email,
  password,
}: LoginData): Promise<{
  accessToken: string;
  refreshToken: {
    id: string;
    expiresIn: number;
  };
}> => {
  try {
    const {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: {
        id: string;
        expiresIn: number;
      };
    } = (
      await getPublicApiInstance().post('/auth/login', {
        email,
        password,
      })
    ).data;
    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      case 401:
        throw new InvalidCredentialsError();
      case 406:
        throw new PendingEmailConfirmationError();
      default:
        throw new UnexpectedError();
    }
  }
};
