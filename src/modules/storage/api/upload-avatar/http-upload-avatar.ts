import {
  getAuthorizedApiInstance,
  getPublicApiInstance,
} from '@/common/axios-instance';
import { EmailInUseError, UnexpectedError } from '@/common/errors';
import { handleAxiosError } from '@/common/helpers/axios-error';
import { UploadAvatarData } from '@/modules/storage/types/upload-avatar-data';

export const httpUploadAvatar = async ({
  avatarFile,
}: UploadAvatarData): Promise<string> => {
  try {
    const { ACL, uploadUrl, publicReadUrl } = (
      await getAuthorizedApiInstance().post('/storage/avatar', {
        mimeType: avatarFile.type,
        fileName: avatarFile.name,
      })
    ).data;
    await getPublicApiInstance().put(uploadUrl, avatarFile, {
      headers: {
        'Content-Type': avatarFile.type,
        'x-amz-acl': ACL ? 'public-read' : 'private',
      },
    });
    return publicReadUrl;
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
