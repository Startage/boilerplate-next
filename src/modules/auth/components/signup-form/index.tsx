import { Error, Input, InputPassword, Link } from '@/common/components';
import {
  PAGE_AUTH_LOGIN,
  PAGE_AUTH_SIGNUP_SUCCESSFUL,
} from '@/common/consts/pages';
import { httpSignup } from '@/modules/auth/api/signup/http-signup';
import { SignupData } from '@/modules/auth/types/signup-data';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

export const SignupForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, error, isLoading } = useMutation(httpSignup, {
    onSuccess: () => {
      router.push(PAGE_AUTH_SIGNUP_SUCCESSFUL);
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile');
    },
  });
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'A senha é diferente da informada anteriormente',
      ),
    name: Yup.string().required(),
    phone: Yup.string().required(),
  });

  const handleSubmit = async ({
    email,
    password,
    passwordConfirmation,
    phone,
    name,
  }: SignupData) => {
    mutate({
      email,
      password,
      passwordConfirmation,
      phone,
      name,
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        phone: '',
        name: '',
        passwordConfirmation: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete={'off'}>
        <Stack spacing={3}>
          <Input fullWidth label={'Nome'} name={'name'} />
          <Input fullWidth label={'Email'} name={'email'} />
          <Input fullWidth label={'Telefone'} mask={'phone'} name={'phone'} />
          <InputPassword fullWidth label={'Senha'} name={'password'} />
          <InputPassword
            fullWidth
            label={'Confirmar Senha'}
            name={'passwordConfirmation'}
          />
          <Error error={error} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 2 }}
        >
          <Link href={PAGE_AUTH_LOGIN}>Já possui conta?</Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          loading={isLoading}
          variant={'contained'}
          type={'submit'}
        >
          Cadastrar
        </LoadingButton>
      </Form>
    </Formik>
  );
};
