import { getAuthorizedApiInstance } from '@/common/axios-instance';
import { UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ProfileModel } from '@/common/models/profile-model';
import { UpdateProfileData } from '@/modules/auth/types/update-profile-data';

export const httpUpdateProfile = async ({
  phone,
  name,
  avatarUrl,
}: UpdateProfileData): Promise<ProfileModel> => {
  try {
    return (
      await getAuthorizedApiInstance().put('/auth/profile', {
        phone,
        name,
        avatarUrl,
      })
    ).data;
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      default:
        throw new UnexpectedError();
    }
  }
};
