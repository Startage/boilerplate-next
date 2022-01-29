import { getAuthorizedApiInstance } from '@/common/axios-instance';
import { InvalidCredentialsError, UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ProfileModel } from '@/common/models/profile-model';
import { ChangeProfilePasswordData } from '@/modules/auth/types/change-profile-password-data';
import { UpdateProfileData } from '@/modules/auth/types/update-profile-data';

export const httpChangeProfilePassword = async ({
  password,
  passwordConfirmation,
  currentPassword,
}: ChangeProfilePasswordData): Promise<void> => {
  try {
    await getAuthorizedApiInstance().put('/auth/profile/password', {
      password,
      passwordConfirmation,
      currentPassword,
    });
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      case 406:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
};
