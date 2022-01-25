import { Link } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password-form';
import { Stack } from '@mui/material';
import React from 'react';

export default function ForgotPassword() {
  return (
    <AuthTemplate
      title={'Estamos quase!'}
      subTitle={
        'Encaminhamos um email para sua caixa de entrada para realizar a alteração da sua senha'
      }
    >
      <ForgotPasswordForm />
      <Stack marginTop={2} alignItems={'center'}>
        <Link href={PAGE_AUTH_LOGIN}>LOGIN</Link>
      </Stack>
    </AuthTemplate>
  );
}
