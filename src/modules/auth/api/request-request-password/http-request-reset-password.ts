import { getPublicApiInstance } from '@/common/axios-instance';
import {
  PendingEmailConfirmationError,
  UnexpectedError,
} from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { RequestForgotPasswordData } from '@/modules/auth/types/request-forgot-password-data';

export const httpRequestResetPassword = async ({
  email,
}: RequestForgotPasswordData): Promise<void> => {
  try {
    await getPublicApiInstance().post('/reset-password', {
      email,
    });
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      default:
        throw new UnexpectedError();
    }
  }
};
