import { Error, Input, InputPassword, Link } from '@/common/components';
import { PendingEmailConfirmationErrorName } from '@/common/consts/errors';
import { PAGE_CUSTOMER_DASHBOARD } from '@/common/consts/pages';
import { AuthContext } from '@/common/contexts/auth-context';
import { ResendConfirmationEmail } from '@/modules/auth/components/resend-confirmation-email';
import { LoginData } from '@/modules/auth/types/login-data';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

export const LoginForm = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const [isOpenResendConfirmationEmail, setIsOpenResendConfirmationEmail] =
    useState(false);

  const { mutate, error, isLoading } = useMutation(authContext.login, {
    onSuccess: () => {},
    onError: (err: Error) => {
      if (err.name === PendingEmailConfirmationErrorName) {
        setIsOpenResendConfirmationEmail(true);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile');
    },
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async ({ email, password }: LoginData) => {
    mutate({
      email,
      password,
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form autoComplete={'off'}>
          <ResendConfirmationEmail
            isOpen={isOpenResendConfirmationEmail}
            handleClose={() => {
              setIsOpenResendConfirmationEmail(false);
            }}
            email={values.email}
          />
          <Stack spacing={3}>
            <Input fullWidth label={'Email'} name={'email'} />
            <InputPassword fullWidth label={'Senha'} name={'password'} />
            <Error error={error} />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ my: 2 }}
          >
            <Link href="/auth/forgot-password">Perdeu a senha?</Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            loading={isLoading}
            variant={'contained'}
            type={'submit'}
          >
            Acessar
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};
