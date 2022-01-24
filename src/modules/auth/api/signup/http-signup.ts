import { getPublicApiInstance } from '@/common/axios-instance';
import { EmailInUseError, UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { SignupData } from '@/modules/auth/types/signup-data';

export const httpSignup = async ({
  email,
  password,
  passwordConfirmation,
  name,
  phone,
}: SignupData): Promise<void> => {
  try {
    await getPublicApiInstance().post('/auth/signup', {
      email,
      password,
      passwordConfirmation,
      name,
      phone,
    });
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      case 406:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
};
