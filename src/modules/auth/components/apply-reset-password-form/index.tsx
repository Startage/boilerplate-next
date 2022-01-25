import { Input, InputPassword } from '@/common/components';
import { PAGE_AUTH_RESET_PASSWORD_SUCCESSFUL } from '@/common/consts/pages';
import { httpApplyResetPassword } from '@/modules/auth/api/apply-reset-password/http-apply-reset-password';
import { ApplyResetPasswordData } from '@/modules/auth/types/apply-reset-password-data';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

const ApplyResetPasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(httpApplyResetPassword, {
    onSuccess: () => {
      router.replace(PAGE_AUTH_RESET_PASSWORD_SUCCESSFUL);
    },
    onError: () => {
      enqueueSnackbar('O Token informado já foi utilizado ou expirou', {
        variant: 'error',
      });
    },
  });

  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'A senha é diferente da informada anteriormente',
      ),
  });

  const handleSubmit = ({
    password,
    passwordConfirmation,
  }: Omit<ApplyResetPasswordData, 'token'>) => {
    mutate({
      password,
      passwordConfirmation,
      token: router.query.token as string,
    });
  };

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete={'off'}>
        <Stack spacing={3}>
          <InputPassword fullWidth label={'Senha'} name={'password'} />
          <InputPassword
            fullWidth
            label={'Confirmar Senha'}
            name={'passwordConfirmation'}
          />
          <LoadingButton
            fullWidth
            size="large"
            loading={isLoading}
            variant={'contained'}
            type={'submit'}
          >
            Alterar senha
          </LoadingButton>
        </Stack>
      </Form>
    </Formik>
  );
};

export { ApplyResetPasswordForm };
