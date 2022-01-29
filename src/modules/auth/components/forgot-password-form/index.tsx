import { Input } from '@/common/components';
import { PAGE_AUTH_FORGOT_PASSWORD_SUCCESSFUL } from '@/common/consts/pages';
import { httpRequestResetPassword } from '@/modules/auth/api/request-request-password/http-request-reset-password';
import { RequestForgotPasswordData } from '@/modules/auth/types/request-forgot-password-data';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

const ForgotPasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(httpRequestResetPassword, {
    onSuccess: () => {
      router.replace(PAGE_AUTH_FORGOT_PASSWORD_SUCCESSFUL);
    },
    onError: () => {
      enqueueSnackbar('Falha ao realizar a operação', {
        variant: 'error',
      });
    },
  });

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const handleSubmit = ({ email }: RequestForgotPasswordData) => {
    mutate({
      email,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleSubmit,
    validationSchema: ForgotPasswordSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3}>
        <Input fullWidth label={'Email'} name={'email'} />
        <LoadingButton
          fullWidth
          size="large"
          loading={isLoading}
          variant={'contained'}
          onClick={formik.submitForm}
        >
          Enviar email
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
};

export { ForgotPasswordForm };
