import { Input } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { httpResendConfirmationEmail } from '@/modules/auth/api/resend-confirm-email/http-resend-confirm-email';
import { ResendConfirmEmailData } from '@/modules/auth/types/resend-confirm-email-data';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

const ExpiredTokenConfirmationEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, error, isLoading } = useMutation(
    httpResendConfirmationEmail,
    {
      onSuccess: () => {
        enqueueSnackbar('Verifique seu email para realizar a confirmação', {
          variant: 'success',
        });
        router.replace(PAGE_AUTH_LOGIN);
      },
    },
  );

  const ResendSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const handleSubmit = ({ email }: ResendConfirmEmailData) => {
    mutate({
      email,
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={ResendSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete={'off'}>
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
            type={'submit'}
          >
            Enviar email novamente
          </LoadingButton>
        </Stack>
      </Form>
    </Formik>
  );
};

export { ExpiredTokenConfirmationEmail };
