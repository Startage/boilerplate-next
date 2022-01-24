import { getPublicApiInstance } from '@/common/axios-instance';
import { UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ConfirmEmailData } from '@/modules/auth/types/confirm-email-data';

export const httpConfirmationEmail = async ({
  token,
}: ConfirmEmailData): Promise<void> => {
  try {
    await getPublicApiInstance().put(`/auth/signup/confirm-email/${token}`);
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      default:
        throw new UnexpectedError();
    }
  }
};
