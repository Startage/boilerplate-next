import { Input } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { httpResendConfirmationEmail } from '@/modules/auth/api/resend-confirm-email/http-resend-confirm-email';
import { ResendConfirmEmailData } from '@/modules/auth/types/resend-confirm-email-data';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

const ExpiredTokenConfirmationEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(httpResendConfirmationEmail, {
    onSuccess: () => {
      enqueueSnackbar('Verifique seu email para realizar a confirmação', {
        variant: 'success',
      });
      router.replace(PAGE_AUTH_LOGIN);
    },
  });

  const ResendSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const handleSubmit = ({ email }: ResendConfirmEmailData) => {
    mutate({
      email,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleSubmit,
    validationSchema: ResendSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3}>
        <Typography color={'error'}>
          Token informado não encontrado ou expirado!
        </Typography>
        <Input fullWidth label={'Email'} name={'email'} />
        <LoadingButton
          fullWidth
          size="large"
          loading={isLoading}
          variant={'contained'}
          onClick={formik.submitForm}
        >
          Enviar email novamente
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
};

export { ExpiredTokenConfirmationEmail };
