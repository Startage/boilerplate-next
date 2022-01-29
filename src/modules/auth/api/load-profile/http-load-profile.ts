import { getAuthorizedApiInstance } from '@/common/axios-instance';
import { UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { ProfileModel } from '@/common/models/profile-model';

export const httpLoadProfile = async (): Promise<ProfileModel> => {
  try {
    return (await getAuthorizedApiInstance().get('/auth/profile')).data;
  } catch (err) {
    const { status } = handleAxiosError(err);
    switch (status) {
      default:
        throw new UnexpectedError();
    }
  }
};
