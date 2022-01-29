import { Error, InputPassword } from '@/common/components';
import { httpChangeProfilePassword } from '@/modules/auth/api/change-profile-password/http-change-profile-password';
import { ChangeProfilePasswordData } from '@/modules/auth/types/change-profile-password-data';
import { Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

export const ChangePasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutateAsync: changePassword,
    error,
    isLoading,
  } = useMutation(httpChangeProfilePassword, {
    onError: (err: Error) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Senha alterada com sucesso');
    },
  });
  const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'A senha é diferente da informada anteriormente',
      ),
  });

  const handleSubmit = async ({
    passwordConfirmation,
    password,
    currentPassword,
  }: ChangeProfilePasswordData) => {
    await changePassword({
      passwordConfirmation,
      password,
      currentPassword,
    });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      passwordConfirmation: '',
      password: '',
      currentPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: ChangePasswordSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3}>
        <InputPassword
          fullWidth
          label={'Senha atual'}
          name={'currentPassword'}
        />
        <InputPassword fullWidth label={'Nova senha'} name={'password'} />
        <InputPassword
          fullWidth
          label={'Confirmar nova senha'}
          name={'passwordConfirmation'}
        />
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
