import { getPublicApiInstance } from '@/common/axios-instance';
import { UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ApplyResetPasswordData } from '@/modules/auth/types/apply-reset-password-data';

export const httpApplyResetPassword = async ({
  token,
  passwordConfirmation,
  password,
}: ApplyResetPasswordData): Promise<void> => {
  try {
    await getPublicApiInstance().put(`/reset-password/${token}`, {
      passwordConfirmation,
      password,
    });
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      case 406:
      default:
        throw new UnexpectedError();
    }
  }
};
