import { Error, Input } from '@/common/components';
import AvatarUpload from '@/common/components/form/avatar-upload';
import { httpLoadProfile } from '@/modules/auth/api/load-profile/http-load-profile';
import { httpUpdateProfile } from '@/modules/auth/api/update-profile/http-update-profile';
import { LOAD_PROFILE_QUERY } from '@/modules/auth/consts/queries';
import { UpdateProfileData } from '@/modules/auth/types/update-profile-data';
import { Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

export const GeneralProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery(LOAD_PROFILE_QUERY, httpLoadProfile, {
    refetchOnMount: false,
  });

  const {
    mutateAsync: updateProfile,
    error,
    isLoading,
  } = useMutation(httpUpdateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(LOAD_PROFILE_QUERY);
      enqueueSnackbar('Perfil atualizado com sucesso');
    },

    onError: (err: Error) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    },
  });
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required(),
    phone: Yup.string().required(),
  });

  const handleSubmit = async ({
    name,
    phone,
    avatarUrl,
  }: UpdateProfileData) => {
    console.log('add', {
      name,
      phone,
      avatarUrl,
    });
    await updateProfile({
      name,
      phone,
      avatarUrl,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      avatarUrl: profile?.avatarUrl || '',
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: ProfileSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3}>
        <AvatarUpload name={'avatarUrl'} />
        <Input fullWidth label={'Nome'} name={'name'} />
        <Input fullWidth label={'Telefone'} mask={'phone'} name={'phone'} />
        <Error error={error} />
        <LoadingButton
          fullWidth
          size="large"
          loading={isLoading}
          variant={'contained'}
          onClick={formik.submitForm}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
};
