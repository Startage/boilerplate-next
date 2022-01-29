import {
  Avatar,
  CenteredContent,
  IconButton,
  EditTitle,
} from '@/common/components/form/avatar-upload/styles';
import { httpUploadAvatar } from '@/modules/storage/api/upload-avatar/http-upload-avatar';
import { useField } from 'formik';
import React, { useRef, useState } from 'react';
import { MdFlipCameraIos } from 'react-icons/md';
import { useMutation } from 'react-query';

type Props = {
  name: string;
};

const AvatarUpload = ({ name }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [field, meta, helpers] = useField(name);
  const { mutateAsync: uploadAvatar } = useMutation(httpUploadAvatar, {
    onError: (err) => {},
  });

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      const avatarUrl = await uploadAvatar({
        avatarFile: newImage,
      });
      console.log('AVATAR URL CARAI', avatarUrl);
      const event: any = {
        target: {
          value: avatarUrl,
          name,
        },
      };
      field.onChange(event);
    }
  };

  return (
    <CenteredContent>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <IconButton component={'div'}>
          <Avatar src={field.value} />
          <div className={'overlay'}>
            <EditTitle fontSize={14} color={'white'}>
              <MdFlipCameraIos size={20} color={'white'} /> Alterar Foto
            </EditTitle>
          </div>
        </IconButton>
      </label>
    </CenteredContent>
  );
};

export default AvatarUpload;
