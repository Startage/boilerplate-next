import { getPublicApiInstance } from '@/common/axios-instance';
import {
  PendingEmailConfirmationError,
  UnexpectedError,
} from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ResendConfirmEmailData } from '@/modules/auth/types/resend-confirm-email-data';

export const httpResendConfirmationEmail = async ({
  email,
}: ResendConfirmEmailData): Promise<void> => {
  try {
    await getPublicApiInstance().post('/auth/signup/resend-confirm-email', {
      email,
    });
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      case 406:
        throw new PendingEmailConfirmationError();
      default:
        throw new UnexpectedError();
    }
  }
};
